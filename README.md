# Resume Design Pro — AI Resume Generator

<div align="center">

**English** | [简体中文](README.zh-CN.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![AI Native](https://img.shields.io/badge/AI%20Native-Universal-blue)](https://github.com/ifeihong/resume-design-pro-skill)
[![Skill Format](https://img.shields.io/badge/Format-SKILL%20v1-green)]()

</div>

> **11 premium design styles** + **AI content optimization** = a resume that looks like a **$500+ professional design project**.  
> Generate production-ready HTML resumes with stunning visual aesthetics, full ATS compatibility, and multi-language support.

## What Makes This Different

### 1. 11 Premium Design Styles — Not Just Templates

Each style is a **complete visual system** with unique color palettes, typography, animations, and layout philosophy. From corporate minimalism to cyberpunk neon, there's a style for every industry and personality.

**Preview the styles:**

| # | Style | Vibe | Best For |
|---|-------|------|----------|
| 01 | **Minimalism & Swiss** | Clean grids, massive whitespace, typography-first | Finance, Consulting, Executive |
| 02 | **Neumorphism** | Soft UI, embossed depth, subtle shadows | UI/UX Designer, Product Manager |
| 03 | **Glassmorphism** | Frosted glass, vibrant backgrounds, blur effects | Frontend Developer, Creative Technologist |
| 04 | **Cyberpunk** | Neon glow, CRT scanlines, grid backgrounds, monospace | Game Dev, Security Engineer, Blockchain |
| 05 | **Brutalism** | Bold typography, high contrast, raw borders | Art Director, Independent Creator |
| 06 | **Claymorphism** | Soft 3D, pastel colors, rounded organic shapes | Illustrator, Educator, Game Designer |
| 07 | **Aurora / Mesh Gradient** | Flowing animated gradients, vibrant colors | Brand Designer, Creative Director |
| 08 | **3D Hyperrealism** | Perspective depth, realistic shadows, layered cards | Architect, Industrial Designer |
| 09 | **Vibrant Block / Maximalist** | Bold color blocks, high saturation, geometric shapes | Marketing Manager, Ad Creative |
| 10 | **Dark OLED Luxury** | Pure black, subtle grays, premium minimalism | CTO/VP, Creative Director |
| 11 | **Organic / Biomorphic** | Earth tones, organic curves, nature-inspired | Sustainability, Natural Brands |

### 2. AI Content Optimization Engine — Truth-First

Your content gets **professionally rewritten** — based on your real information, never fabricated:

| Before | After (with your data) | After (no data provided) |
|--------|------------------------|--------------------------|
| "Responsible for website development" | "Led full-stack development of company website, increasing conversion by 35%" | "Led full-stack development of company website, delivering significant business impact" |
| "Good at teamwork" | "Collaborated with cross-functional teams of 8+ members to deliver 3 major releases" | "Collaborated with cross-functional teams to deliver multiple major releases" |
| "Learned React quickly" | "Mastered React ecosystem in 2 weeks, shipped production feature in sprint 3" | "Rapidly mastered React ecosystem and shipped production features ahead of schedule" |

**The 9-step optimization process:**
1. **Extract** — Parse your raw information with source attribution
2. **Preserve** — Keep ALL your work experiences (never discard any)
3. **Tier** — Prioritize by relevance: core (3-5 highlights) / support (2-3) / early (1-2)
4. **Quantify (Truthful)** — Three-tier strategy: exact data / estimated (labeled) / qualitative (no fabrication)
5. **Lock Attribution** — Ensure every description stays with its correct company
6. **Reword** — Use action verbs and STAR methodology
7. **Restructure** — Professional resume format
8. **HR Check** — Validate against real hiring manager standards
9. **Confirm** — Show before/after with transparency, you approve

**Key principles:**
- **Never fabricate data** — if you didn't provide a number, we won't invent one
- **Preserve all experiences** — every job you've had stays on your resume
- **Company attribution lock** — descriptions never get mixed between companies
- **Content density choice** — Concise (1 page) / Standard (1-2 pages) / Detailed (2-3 pages)

**Prefer to keep your original content?** Just say `/raw` — zero modifications, pure design transformation.

### 3. Complete Output Package

One invocation, **6 deliverables**:

| File | Purpose |
|------|---------|
| `resume-{name}-{style}.html` | Stunning visual resume — open in browser |
| `resume-{name}-{style}.pdf` | **Auto-exported PDF** — pixel-perfect, print-ready, no manual action needed |
| `resume-{name}-ats.html` | Plain-text ATS version — safe for applicant tracking systems |
| `resume-{name}.md` | Markdown backup — easy to edit and reuse |
| `cover-letter-{name}.html` | Matching cover letter — same visual style |
| `linkedin-export.md` | LinkedIn-optimized content — copy-paste ready |

**The PDF is generated automatically** using Playwright headless Chromium — colors, fonts, gradients, and layout are preserved exactly as seen in the browser. No need to open Chrome and press Ctrl+P.

## Language Support

| Language | Code | Font | Status |
|----------|------|------|--------|
| English | `en` | Noto Sans | Stable |
| 简体中文 | `zh-CN` | Noto Sans SC | Stable |
| 日本語 | `ja` | Noto Sans JP | Stable |
| 한국어 | `ko` | Noto Sans KR | Stable |

**Roadmap**: 14 additional languages including Spanish, French, Arabic (RTL) — see [MULTI-LANGUAGE-EXTENSION-PLAN.md](docs/MULTI-LANGUAGE-EXTENSION-PLAN.md)

## Quick Start

### For Users

```bash
# In any AI coding assistant
use resume-design-pro
```

Follow the prompts to:
1. Provide your resume information (upload, paste, or conversation)
2. Choose content optimization mode (default) or RAW mode
3. Select from 11 design styles
4. Get your complete resume package

### For Developers

```bash
# Clone and install
git clone <repo-url>
cd resume-design-pro/scripts
npm install

# Export PDF from HTML
node export-pdf.js ../templates/template-01-minimalism.html
```

## Project Structure

```
resume-design-pro/
├── skills/resume-design-pro/SKILL.md    # Core skill definition
├── templates/                           # 11 style templates + extras
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
│   ├── ats-template.html                # ATS-optimized version
│   ├── cover-letter-template.html       # Cover letter template
│   ├── linkedin-export.md               # LinkedIn optimization guide
│   └── _shared/
│       └── demo-content-zh.md           # Standardized demo content
├── demos/                               # Example resumes
├── scripts/                             # PDF export tools
│   ├── export-pdf.js                    # Single file export
│   ├── export-pdf-batch.js              # Batch export
│   ├── package.json
│   └── README.md
├── docs/                                # Documentation
│   ├── USER-GUIDE.md                    # User guide
│   └── MULTI-LANGUAGE-EXTENSION-PLAN.md # 14-language roadmap
├── LICENSE                              # MIT License
├── README.md                            # This file
└── THIRD_PARTY_NOTICES.md               # Attribution
```

## PDF Export

### Method 1: Browser Print (Easiest)
1. Open HTML file in browser
2. Press Ctrl+P → Select "Save as PDF"
3. Paper size: A4, Margins: Default
4. Check "Background graphics" to preserve colors

### Method 2: Node.js Script
```bash
cd scripts
npm install
node export-pdf.js ../templates/template-01-minimalism.html
```

## Platform Compatibility

**Resume Design Pro** is built on the open SKILL format — it works with any AI assistant that supports skill invocation.

| Category | Examples |
|----------|----------|
| AI Coding Assistants | Claude Code, Trae, Codex, Cursor, GitHub Copilot Chat |
| AI Agent Platforms | Coze (扣子), Dify, LangChain Agents, AutoGen |
| Custom AI Tools | Any platform supporting Markdown-based skill files |

**Requirements:** The platform only needs to:
1. Read and follow Markdown instructions
2. Generate text/HTML output
3. Support basic user interaction (prompt → response)

No special plugins, APIs, or integrations required.

## Who Is This For?

- **Job seekers** in tech, design, finance, consulting
- **International applicants** applying to global companies
- **Career changers** who need a professional resume fast
- **Students** applying for internships or first jobs
- **Freelancers** who want to stand out with unique visual identity

## License

MIT License - See [LICENSE](LICENSE) for details.

Design aesthetic system based on [frontend-design-pro-demo](https://github.com/claudekit/frontend-design-pro-demo) by ClaudeKit (MIT License).

All fonts from Google Fonts (OFL License).
