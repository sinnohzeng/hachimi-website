# Orb 官网交付与复用记录

## 本轮范围

2026-09-15，Owner 确认黑银方案；图标放大偏左下，Hero 小猫位于左侧文字区，右侧保留 App 功能截图。favicon、Apple Touch、PWA、分享图和页脚品牌同时更新。最新授权只发布官网，iOS 成果由其他对话统筹。

## 验证

- `npm run check` 完整通过：格式、ESLint、TypeScript、四项 Orb 测试、文案门和静态构建。
- 35 状态 × 5 时点，共 175 帧与原生 Swift 输出以 1e-6 精度对拍；另验 30/120 Hz 一致、输入有界、产物哈希。
- 受控浏览器中英桌面与手机预览：Hero 左侧小人物、右侧功能图；无横向溢出。减少动态使用原生静态回退。
- 真实浏览器测量：左右指针 gaze 分别为 (-2.98,13.99,1.67)、(12.97,4.02,2.81)；Hero 离屏时钟停止、Footer 时钟运行，回到 Hero 后继续推进。
- 生成物和源码 SHA256 见 `public/brand/orb-source.json`，图标母版来源见 iOS `design/brand/orb-icon-source.json`。

## 可复用工作范式

1. 几何留在原生真源；导出数值模型和固定种子采样帧，网页移植数值逻辑后对拍。完整 35 状态保留猫的形体；radar、orbit、progress 用扫描、绕行、工作动作表达，不改成外站的抽象形状。
2. 先固定角度/弧度、球半径单位与时钟步长。切态从当前插值帧开始；旋转属于动作偏移，避免从 360 度弹回 0 度。眨眼队列按保持段执行，不误读成线性插值。
3. 高分辨率图标单独提高耳部栅格上限；正常舞台维持低成本。favicon 用 RGBA ICO 多尺寸，不能给 PNG 改扩展名。
4. 隔离 worktree 不要把 node_modules 链到仓外，Turbopack 会拒绝。独立安装或 APFS 克隆；构建的本机端口权限问题与代码错误分开记录。
5. 滚动库可能延迟实际滚动。先确认元素离屏/进入视口，再测停钟与恢复，不能只等一个任意短延时。
6. 每个可看版本主动打开受控网页；预览、生产部署、App Store 上传和审核是不同状态。跨对话记录分支、基线、测试边界与负责人；只提交自己负责的路径。

## 发布

发布前生产回滚点：`ba9f06a7-c249-48a2-9e41-81769750dd63`。

- 实现提交：`283c613b11deea6d33ecd8ff23a6e5efe78a5bd0`，已推官网 main，本地主线已快进同步。
- Cloudflare 生产部署：`1741177a-5234-451c-86db-ef4ce6a27b71`，deploy stage success；专属域 `https://1741177a.hachimi-app-website.pages.dev`。
- 生产 `https://hachimi.ai/zh` 和 `/en` 正常，浏览器确认 Hero 的 orbReady=true、时钟推进。中英隐私、条款与中文支持页均 HTTP 200。
- 生产 favicon、icon.png、apple-icon.png、orb-model.json、orb-source.json 的 SHA256 与本地提交逐字节相同。favicon SHA256：`030a55c5f963a499ceca22d1f3adbc8d5bbb610f04e6e4886442d3e009ddb038`。
- 生产减少动态实测：canvas hidden、原生静态图 visible；服务器 HTML 包含静态回退。页脚实际使用黑底银白猫，完整编排正常。
- 原生交接提交：iOS `e2d67b6`，分支 `feat/orb-ip-062`；没有改版本、合并 iOS main、上传或提审。
- Python urllib 的生产请求受到 HTTP 403 限制；改由正常访问官网的受控浏览器 fetch 验证状态和 SHA256，不把命令行受限误判为网站故障。
- 上线截图：[Hero](evidence/production-hero.png)、[页脚](evidence/production-footer.png)。

## 文档债务

本轮经验与生成规程均在 Git 文档中；iOS 全量验证及发版属于明确交接事项，不宣称本轮已完成。

## 追加 Device 展示

- 按 Owner 指定配置授权 registry，执行官方 shadcn add 安装成功；Device 接入 AppShot 后三处 iPhone 展示统一。
- Device 第一版（随后按 Owner 意见放大 Hero）：桌面 1280×900，首屏设备 288×584px，两张命盘设备 240×487px；手机 390×844：224×454px、208×422px，无横向溢出。截图内容维持全幅。
- Device 接入后的 `npm run check` 全量通过；无新增 lint 错误。默认不自动摆动、不内部滚动，保留触屏页面滚动；减少动态静止。
- Registry 源码沿用 rem 固定尺寸时，单纯 scale 不改变布局占位；通过容器宽度与 em 比例适配后，外层尺寸和实际机身保持一致。`cn` 是 registry 源码的隐式依赖，需要显式补齐。
- 配置、许可边界和维护步骤已补进 design/brand/README.md；许可原值未入 Git。
- 新版预览：[桌面 Device](evidence/device-desktop.png)、[手机 Device](evidence/device-mobile.png)。

### Hero 最终构图

Owner 追加要求首屏设备更大、底部允许遮住。最终 1280×900 视口下设备为 432×876px，Hero 下沿裁去约 138px；390×844 下设备宽 256px，裁去约 70px。命盘区不裁切。桌面与移动均无横向溢出，完整质量门通过。

[放大后的 Hero](evidence/hero-large.png)、[移动版](evidence/hero-large-mobile.png)。原 288px 设备截图仅为前一轮过程记录。深色命盘截图已实测选中 dark 文件，两张均加载成功；减少动态经等待 React 更新后实测 transform=none。
