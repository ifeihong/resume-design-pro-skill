# Resume Design Pro — AI 简历生成器

<div align="center">

[English](README.md) | **简体中文** | [日本語](README.ja.md) | [한국어](README.ko.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Platform: Claude Code](https://img.shields.io/badge/Platform-Claude%20Code-blue)](https://claude.ai/code)
[![Platform: Trae](https://img.shields.io/badge/Platform-Trae-green)](https://www.trae.ai/)
[![Platform: Codex](https://img.shields.io/badge/Platform-Codex-purple)](https://openai.com/index/introducing-codex/)

</div>

> **11 套高品质设计风格** + **AI 内容深度优化** = 价值 **500 美元以上的专业设计水准简历**。  
> 生成可直接用于求职的生产级 HTML 简历，兼具惊艳视觉效果、完整 ATS 兼容性和多语言支持。

## 核心差异化优势

### 1. 11 套高品质设计风格 — 不只是模板

每套风格都是**完整的视觉系统**，拥有独立的配色方案、字体排印、动画效果和布局哲学。从企业极简到赛博朋克霓虹，为每个行业和个性量身定制。

**风格一览：**

| # | 风格 | 视觉特点 | 适合人群 |
|---|------|---------|---------|
| 01 | **极简瑞士** | 干净网格、大量留白、字体优先 | 金融、咨询、高管 |
| 02 | **新拟态** | 柔和 UI、浮雕深度、微妙阴影 | UI/UX 设计师、产品经理 |
| 03 | **玻璃拟态** | 毛玻璃、鲜艳背景、模糊效果 | 前端开发、创意技术 |
| 04 | **赛博朋克** | 霓虹发光、CRT 扫描线、网格背景、等宽字体 | 游戏开发、安全工程师、区块链 |
| 05 | **粗野主义** | 粗体排版、高对比、原始边框 | 艺术总监、独立创作者 |
| 06 | **黏土拟态** | 柔和 3D、 pastel 色、圆润有机形状 | 插画师、教育工作者、游戏设计师 |
| 07 | **极光渐变** | 流动动画渐变、鲜艳色彩 | 品牌设计师、创意总监 |
| 08 | **3D 超写实** | 透视深度、真实阴影、分层卡片 | 建筑师、工业设计师 |
| 09 | **鲜艳块面** | 大胆色块、高饱和、几何形状 | 营销经理、广告创意 |
| 10 | **暗黑 OLED** | 纯黑、微妙灰、高端极简 | CTO/VP、创意总监 |
| 11 | **有机生物** | 大地色调、有机曲线、自然灵感 | 可持续发展、自然品牌 |

### 2. AI 内容深度优化引擎

你的内容会被**专业级重写** — 不只是排版：

| 优化前 | 优化后 |
|--------|--------|
| "负责网站开发" | "主导公司网站全栈开发，转化率提升 35%" |
| "擅长团队合作" | "与 8 人以上跨职能团队协作，成功交付 3 个重大版本" |
| "快速学会了 React" | "2 周内掌握 React 生态，第 3 个冲刺即交付生产级功能" |

**6 步优化流程：**
1. **提取** — 解析你的原始信息
2. **筛选** — 保留高影响力内容
3. **量化** — 添加指标和数字
4. **润色** — 使用专业动词和 STAR 法则
5. **重构** — 专业简历格式
6. **确认** — 展示前后对比，由你确认

**想保留原始内容？** 输入 `/raw` — 零修改，纯设计转换。

### 3. 完整输出包

一次调用，**5 份交付物**：

| 文件 | 用途 |
|------|------|
| `resume-{姓名}-{风格}.html` | 精美视觉简历 — 浏览器打开，打印为 PDF |
| `resume-{姓名}-ats.html` | 纯文本 ATS 版本 — 招聘系统安全投递 |
| `resume-{姓名}.md` | Markdown 备份 — 随时编辑复用 |
| `cover-letter-{姓名}.html` | 配套求职信 — 同风格视觉 |
| `linkedin-export.md` | LinkedIn 优化内容 — 复制粘贴即用 |

## 语言支持

| 语言 | 代码 | 字体 | 状态 |
|------|------|------|------|
| 简体中文 | `zh-CN` | Noto Sans SC | 稳定 |
| English | `en` | Noto Sans | 稳定 |
| 日本語 | `ja` | Noto Sans JP | 稳定 |
| 한국어 | `ko` | Noto Sans KR | 稳定 |

**路线图**：14 种扩展语言（西班牙语、法语、阿拉伯语 RTL 等）—— 详见 [MULTI-LANGUAGE-EXTENSION-PLAN.md](docs/MULTI-LANGUAGE-EXTENSION-PLAN.md)

## 快速开始

### 用户使用

```bash
# 在 Claude Code / Trae / Codex 中
use resume-design-pro
```

按提示操作：
1. 提供简历信息（上传、粘贴或对话）
2. 选择内容优化模式（默认）或原封不动模式
3. 从 11 种设计风格中选择
4. 获取完整简历包

### 开发者使用

```bash
# 克隆并安装
git clone <repo-url>
cd resume-design-pro/scripts
npm install

# 从 HTML 导出 PDF
node export-pdf.js ../templates/template-01-minimalism.html
```

## 项目结构

```
resume-design-pro/
├── skills/resume-design-pro/SKILL.md    # 核心 Skill 定义
├── templates/                           # 11 套风格模板 + 附加模板
│   ├── template-01-minimalism.html
│   ├── template-02-neumorphism.html
│   ├── template-03-glassmorphism.html
│   ├── template-04-cyberpunk.html
│   ├── template-05-brutalism.html
│   ├── template-06-claymorphism.html
│   ├── template-07-aurora.html
│   ├── template-08-3d-hyperrealism.html
│   ├── template-09-vibrant-block.html
│   ├── template-10-dark-oled.html
│   ├── template-11-organic.html
│   ├── ats-template.html                # ATS 优化版本
│   ├── cover-letter-template.html       # 求职信模板
│   ├── linkedin-export.md               # LinkedIn 优化指南
│   └── _shared/
│       └── demo-content-zh.md           # 标准化演示内容
├── demos/                               # 示例简历
├── scripts/                             # PDF 导出工具
│   ├── export-pdf.js                    # 单文件导出
│   ├── export-pdf-batch.js              # 批量导出
│   ├── package.json
│   └── README.md
├── docs/                                # 文档
│   ├── USER-GUIDE.md                    # 用户指南
│   └── MULTI-LANGUAGE-EXTENSION-PLAN.md # 14 语言扩展路线图
├── LICENSE                              # MIT 许可证
├── README.md                            # 英文版说明
└── THIRD_PARTY_NOTICES.md               # 第三方声明
```

## PDF 导出

### 方法 1：浏览器打印（最简单）
1. 用浏览器打开 HTML 文件
2. 按 Ctrl+P → 选择"另存为 PDF"
3. 纸张大小：A4，边距：默认
4. 勾选"背景图形"以保留颜色

### 方法 2：Node.js 脚本
```bash
cd scripts
npm install
node export-pdf.js ../templates/template-01-minimalism.html
```

## 平台支持

| 平台 | 状态 | 说明 |
|------|------|------|
| Claude Code | 已支持 | 主要开发平台 |
| Trae | 已支持 | 已测试验证 |
| Codex | 已支持 | 兼容 |
| Cursor | 兼容 | 可能需要微调 |

## 适合谁用

- **求职者**：技术、设计、金融、咨询领域
- **国际求职者**：申请跨国公司职位
- **转行者**：需要快速制作专业简历
- **学生**：申请实习或第一份工作
- **自由职业者**：希望以独特视觉形象脱颖而出

## 许可证

MIT 许可证 — 详见 [LICENSE](LICENSE)。

设计美学系统基于 [frontend-design-pro-demo](https://github.com/claudekit/frontend-design-pro-demo) by ClaudeKit (MIT License)。

所有字体来自 Google Fonts (OFL License)。
