import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "error",

      "react/jsx-no-target-blank": ["error", { enforceDynamicLinks: "always" }],

      // 静态导出没有图片优化服务（images.unoptimized），截图与静帧在构建前已出好多档 WebP，
      // 用原生 <img> 加 srcset；next/image 在这里只多一层包装。
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // wrangler pages dev 的本地状态与打包产物
    ".wrangler/**",
  ]),
]);

export default eslintConfig;
