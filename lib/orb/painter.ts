import * as THREE from "three";
import { whiskerPaths } from "./whiskers";
import { basis, item, type Frame, type OrbModel } from "./types.ts";

/** Native ear mesh uses GPU depth; final eyes and whiskers are true transparent cutouts. */
export class OrbPainter {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.OrthographicCamera(-1.8, 1.8, 1.8, -1.8, 0.1, 20);
  private body: THREE.Mesh;
  private ears: THREE.Mesh;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private model: OrbModel;
  private ink: string;

  constructor(
    canvas: HTMLCanvasElement,
    model: OrbModel,
    ink = "#e8e8e8",
    paper = "#0d1b2a"
  ) {
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas unavailable");
    this.canvas = canvas;
    this.context = context;
    this.model = model;
    this.ink = ink;
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setClearColor(0, 0);
    this.camera.position.z = 5;
    this.body = new THREE.Mesh(
      new THREE.SphereGeometry(1, 96, 64),
      new THREE.MeshBasicMaterial({ color: ink })
    );
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(model.ears.position, 3)
    );
    geometry.setAttribute(
      "earRadius",
      new THREE.Float32BufferAttribute(model.ears.radius, 1)
    );
    geometry.setAttribute(
      "earFront",
      new THREE.Float32BufferAttribute(model.ears.front, 1)
    );
    geometry.computeVertexNormals();
    this.ears = new THREE.Mesh(
      geometry,
      new THREE.ShaderMaterial({
        uniforms: {
          ink: { value: new THREE.Color(ink) },
          paper: { value: new THREE.Color(paper) },
        },
        side: THREE.DoubleSide,
        vertexShader: `attribute float earRadius; attribute float earFront;
        varying float radius; varying float front; varying vec3 n;
        void main() { radius=earRadius; front=earFront; n=normalMatrix*normal;
          gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 ink; uniform vec3 paper;
        varying float radius; varying float front; varying vec3 n;
        void main() { vec3 normal=normalize(n); if(normal.z<0.0) normal=-normal;
          float tone=0.035+0.15*(1.0-max(0.0,dot(normal,normalize(vec3(-0.3,0.45,1.0)))));
          if(front>0.5 && radius<=0.65) tone=0.40+tone*0.55;
          gl_FragColor=vec4(mix(ink,paper,tone),1.0);
          #include <colorspace_fragment>
        }`,
      })
    );
    this.ears.matrixAutoUpdate = false;
    this.scene.add(this.body, this.ears);
  }

  resize(size: number): void {
    const pixels = Math.max(
      16,
      Math.round(size * Math.min(window.devicePixelRatio || 1, 2))
    );
    if (this.canvas.width === pixels) return;
    this.canvas.width = pixels;
    this.canvas.height = pixels;
    this.renderer.setSize(pixels, pixels, false);
  }

  paint(frame: Frame): void {
    const { right: r, down: d, forward: f } = basis(frame.gaze);
    const sy = item(frame.stretch, 1),
      cy = item(frame.center, 1);
    this.body.scale.set(1, sy, 1);
    this.body.position.y = -cy;
    this.ears.matrix.set(
      r[0],
      d[0],
      f[0],
      0,
      -r[1] * sy,
      -d[1] * sy,
      -f[1] * sy,
      -cy,
      r[2],
      d[2],
      f[2],
      0,
      0,
      0,
      0,
      1
    );
    this.renderer.render(this.scene, this.camera);
    const ctx = this.context,
      size = this.canvas.width;
    ctx.resetTransform();
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(this.renderer.domElement, 0, 0);
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.scale(size / 360, size / 360);
    this.whiskers(frame);
    ctx.globalCompositeOperation = "destination-out";
    for (const eye of frame.eyes) {
      const [w, h, a, b, c, d, x, y, alpha] = eye.map((v) => v) as [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
      ];
      ctx.save();
      ctx.transform(a, b, c, d, x, y);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.roundRect(-w / 2, -h / 2, w, h, Math.min(w, h) / 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  private whiskers(frame: Frame): void {
    const sy = item(frame.stretch, 1),
      cy = item(frame.center, 1);
    const paths = whiskerPaths(this.model, frame);
    const ctx = this.context;
    for (const outside of [true, false]) {
      ctx.save();
      ctx.beginPath();
      if (outside) ctx.rect(-180, -180, 360, 360);
      ctx.ellipse(0, cy * 100, 100, sy * 100, 0, 0, Math.PI * 2);
      ctx.clip("evenodd");
      ctx.globalCompositeOperation = outside
        ? "source-over"
        : "destination-out";
      ctx.fillStyle = this.ink;
      for (const points of paths) {
        ctx.beginPath();
        points.forEach((point, index) => {
          if (index === 0) ctx.moveTo(item(point, 0), item(point, 1));
          else ctx.lineTo(item(point, 0), item(point, 1));
        });
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
  }

  dispose(): void {
    for (const mesh of [this.body, this.ears]) {
      mesh.geometry.dispose();
      for (const material of Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material])
        material.dispose();
    }
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }
}
