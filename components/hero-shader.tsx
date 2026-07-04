"use client";

import { useEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec2 iMouse;
  varying vec2 vUv;

  #define PI 3.141592654

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime * 0.15;

    vec2 mouse = iMouse;
    mouse.x *= iResolution.x / iResolution.y;

    vec2 toMouse = uv - mouse;
    float dist = length(toMouse);
    float influence = exp(-dist * dist * 2.0) * 0.12;
    vec2 displacement = toMouse * influence / (dist + 0.1);
    vec2 displacedUv = uv + displacement;

    vec3 col = vec3(0.02, 0.02, 0.06);

    float beam1 = snoise(vec3(displacedUv.x * 1.5 + t * 0.5, displacedUv.y * 0.8 - t * 0.2, t * 0.3));
    float beam2 = snoise(vec3(displacedUv.x * 2.0 - t * 0.3, displacedUv.y * 0.6 + t * 0.1, t * 0.2 + 10.0));
    float beam3 = snoise(vec3(displacedUv.x * 1.2 + t * 0.2, displacedUv.y * 1.0 - t * 0.15, t * 0.25 + 20.0));

    float verticalFade = pow(1.0 - uv.y, 1.5);
    float verticalFade2 = pow(1.0 - uv.y, 2.5);

    float light1 = smoothstep(0.0, 0.8, beam1 * verticalFade);
    float light2 = smoothstep(0.0, 0.7, beam2 * verticalFade);
    float light3 = smoothstep(0.0, 0.6, beam3 * verticalFade2);

    vec3 orange = vec3(0.95, 0.4, 0.1);
    vec3 red = vec3(0.85, 0.15, 0.2);
    vec3 pink = vec3(0.7, 0.2, 0.4);
    vec3 blue = vec3(0.1, 0.3, 0.7);
    vec3 cyan = vec3(0.1, 0.6, 0.8);

    float xPos = uv.x / (iResolution.x / iResolution.y);

    col += orange * light1 * 0.6 * smoothstep(0.6, 0.2, xPos);
    col += red * light1 * 0.5 * smoothstep(0.3, 0.5, xPos) * smoothstep(0.7, 0.5, xPos);
    col += pink * light2 * 0.4 * smoothstep(0.4, 0.6, xPos);
    col += blue * light3 * 0.5 * smoothstep(0.5, 0.8, xPos);
    col += cyan * light2 * 0.3 * smoothstep(0.7, 1.0, xPos);

    float centerGlow = exp(-pow((xPos - 0.5) * 2.0, 2.0)) * verticalFade2;
    col += vec3(0.9, 0.5, 0.3) * centerGlow * 0.3;

    float vignette = 1.0 - pow(length(uv - vec2(0.5 * iResolution.x / iResolution.y, 0.5)) * 0.8, 2.0);
    col *= max(vignette, 0.3);

    col = pow(col, vec3(0.9));

    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * Hero 的 WebGL shader 背景。独立成文件后由 hero 经 next/dynamic（ssr: false）
 * 按需加载，three.js 不再进入首屏 bundle；父组件在 reduced motion 时不挂载本组件。
 * rAF 渲染循环由 IntersectionObserver 门控，hero 滚出视口时暂停、回到视口时恢复。
 */
export function HeroShader(): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(width, height) },
      iMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const targetMouse = { x: 0.5, y: 0.5 };
    const currentMouse = { x: 0.5, y: 0.5 };

    function handleMouseMove(e: MouseEvent) {
      const rect = container.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
    }

    const startTime = Date.now();
    let frameId = 0;
    let running = false;

    function animate() {
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.08;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.08;
      uniforms.iMouse.value.set(currentMouse.x, currentMouse.y);

      uniforms.iTime.value = (Date.now() - startTime) * 0.001;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    function start() {
      if (running) return;
      running = true;
      frameId = requestAnimationFrame(animate);
    }

    function stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frameId);
    }

    // 先同步渲染一帧，覆盖 canvas 挂载到 observer 首次回调之间的空档，防闪黑。
    renderer.render(scene, camera);

    container.addEventListener("mousemove", handleMouseMove);

    // 可见性门控：hero 离屏时暂停 rAF 循环，避免后台持续消耗 GPU / 主线程。
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          start();
        } else {
          stop();
        }
      }
    });
    observer.observe(container);

    function handleResize() {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      renderer.setSize(newWidth, newHeight);
      uniforms.iResolution.value.set(newWidth, newHeight);
      if (!running) renderer.render(scene, camera);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      stop();
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />
  );
}
