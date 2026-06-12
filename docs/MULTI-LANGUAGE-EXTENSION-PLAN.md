# 多语言扩展详细实施计划

## 概述

本计划详细描述如何将 Resume Design Pro 从当前支持的 4 种语言（中文、英语、日语、韩语）扩展到 18 种语言，新增 14 种语言支持。核心挑战在于阿拉伯语的 RTL（从右到左）排版支持，以及各语言字体策略的制定。

---

## 一、语言清单与优先级

### 第一梯队（高优先级，使用人口多 / 市场需求大）

| 语言 | 代码 | 方向 | 字体族 | 备注 |
|------|------|------|--------|------|
| 西班牙语 | es | LTR | Noto Sans, Noto Serif | 拉丁字母，与英文共用字体 |
| 法语 | fr | LTR | Noto Sans, Noto Serif | 拉丁字母，带变音符号 |
| 德语 | de | LTR | Noto Sans, Noto Serif | 拉丁字母，带变音符号 |
| 葡萄牙语 | pt | LTR | Noto Sans, Noto Serif | 拉丁字母 |
| 俄语 | ru | LTR | Noto Sans Cyrillic | 西里尔字母 |
| 阿拉伯语 | ar | **RTL** | Noto Sans Arabic, Noto Naskh Arabic | **唯一 RTL 语言** |

### 第二梯队（中优先级）

| 语言 | 代码 | 方向 | 字体族 | 备注 |
|------|------|------|--------|------|
| 印地语 | hi | LTR | Noto Sans Devanagari | 天城文 |
| 越南语 | vi | LTR | Noto Sans, Noto Serif | 拉丁字母扩展，带声调符号 |
| 意大利语 | it | LTR | Noto Sans, Noto Serif | 拉丁字母 |
| 波兰语 | pl | LTR | Noto Sans, Noto Serif | 拉丁字母扩展 |
| 土耳其语 | tr | LTR | Noto Sans, Noto Serif | 拉丁字母扩展 |
| 泰语 | th | LTR | Noto Sans Thai | 泰文 |
| 印尼语 | id | LTR | Noto Sans, Noto Serif | 拉丁字母 |
| 马来语 | ms | LTR | Noto Sans, Noto Serif | 拉丁字母 |

---

## 二、字体加载策略

### 2.1 Google Fonts 加载方案

采用 **Unicode Range 子集化加载**，避免一次性加载全部字符集：

```html
<!-- 拉丁字母语言共用（西/法/德/葡/意/波/土/越/印尼/马来） -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&family=Noto+Serif:wght@400;700&display=swap" rel="stylesheet">

<!-- 西里尔字母（俄语） -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&subset=cyrillic&display=swap" rel="stylesheet">

<!-- 天城文（印地语） -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;700&display=swap" rel="stylesheet">

<!-- 泰文（泰语） -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;700&display=swap" rel="stylesheet">

<!-- 阿拉伯文（阿拉伯语） -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap" rel="stylesheet">
```

### 2.2 CSS 字体栈定义

```css
:root {
  /* 拉丁字母语言 */
  --font-latin: 'Noto Sans', 'Segoe UI', system-ui, sans-serif;
  --font-latin-serif: 'Noto Serif', Georgia, serif;

  /* 西里尔字母 */
  --font-cyrillic: 'Noto Sans', 'Noto Sans Cyrillic', 'Segoe UI', sans-serif;

  /* 天城文 */
  --font-devanagari: 'Noto Sans Devanagari', 'Noto Sans', sans-serif;

  /* 泰文 */
  --font-thai: 'Noto Sans Thai', 'Noto Sans', sans-serif;

  /* 阿拉伯文（RTL） */
  --font-arabic: 'Noto Sans Arabic', 'Noto Naskh Arabic', 'Segoe UI', sans-serif;
}
```

### 2.3 动态字体加载逻辑

在模板头部根据 `{{LANGUAGE}}` 变量动态插入对应的字体链接：

```html
<script>
  const lang = '{{LANGUAGE}}' || 'zh';
  const fontMap = {
    'es': 'latin', 'fr': 'latin', 'de': 'latin', 'pt': 'latin',
    'it': 'latin', 'pl': 'latin', 'tr': 'latin', 'vi': 'latin',
    'id': 'latin', 'ms': 'latin',
    'ru': 'cyrillic',
    'hi': 'devanagari',
    'th': 'thai',
    'ar': 'arabic'
  };
  // 动态插入 <link> 标签
</script>
```

---

## 三、RTL（阿拉伯语）专项方案

### 3.1 HTML 层面

```html
<!-- 阿拉伯语模板必须在 <html> 或 <body> 上设置 dir="rtl" -->
<html lang="ar" dir="rtl">
```

### 3.2 CSS 逻辑属性改造

将所有涉及方向的物理属性替换为逻辑属性：

| 物理属性 | 逻辑属性 | 说明 |
|----------|----------|------|
| `margin-left` | `margin-inline-start` | 内联起始边距 |
| `margin-right` | `margin-inline-end` | 内联结束边距 |
| `padding-left` | `padding-inline-start` | 内联起始内边距 |
| `padding-right` | `padding-inline-end` | 内联结束内边距 |
| `border-left` | `border-inline-start` | 内联起始边框 |
| `border-right` | `border-inline-end` | 内联结束边框 |
| `text-align: left` | `text-align: start` | 文本起始对齐 |
| `text-align: right` | `text-align: end` | 文本结束对齐 |
| `float: left` | `float: inline-start` | 内联起始浮动 |
| `float: right` | `float: inline-end` | 内联结束浮动 |

### 3.3 阿拉伯语专用 CSS 覆盖

```css
/* 仅在 dir="rtl" 时生效 */
[dir="rtl"] {
  direction: rtl;
  text-align: start;
}

[dir="rtl"] .resume-container {
  /* 镜像布局 */
}

[dir="rtl"] .timeline::before {
  left: auto;
  right: 0;
}

[dir="rtl"] .skill-bar-fill {
  transform-origin: right;
}
```

### 3.4 双向文本（Bidi）处理

阿拉伯语中常混有英文技术术语、数字，需使用 `<bdi>` 或 `dir="ltr"` 隔离：

```html
<!-- 混合文本示例 -->
<p>خبرة في <bdi>React.js</bdi> و <bdi>Node.js</bdi></p>
<!-- 或 -->
<p>خبرة في <span dir="ltr">React.js</span></p>
```

### 3.5 阿拉伯语排版细节

- **数字显示**：阿拉伯语地区常用阿拉伯-印度数字（٠١٢٣٤٥٦٧٨٩），但技术简历通常保留阿拉伯数字（0-9）
- **字体大小**：阿拉伯文字符通常需要比拉丁字母大 10-15% 的字号以保持可读性
- **行高**：建议 `line-height: 1.8`（比 LTR 语言的 1.6 略高）

---

## 四、各语言 section 标题翻译表

### 4.1 核心 Section 标题（18 语言对照）

| Section Key | 中文 | English | 日本語 | 한국어 | Español | Français | Deutsch | Português | Русский | العربية | हिन्दी | Tiếng Việt | Italiano | Polski | Türkçe | ไทย | Bahasa Indonesia | Bahasa Melayu |
|-------------|------|---------|--------|--------|---------|----------|---------|-----------|---------|---------|--------|------------|----------|--------|--------|-----|------------------|---------------|
| professional_summary | 职业概述 | Professional Summary | 職務要約 | 전문 요약 | Resumen Profesional | Résumé Professionnel | Zusammenfassung | Resumo Profissional | Профессиональное резюме | ملخص مهني | व्यावसायिक सारांश | Tóm tắt chuyên môn | Riassunto Professionale | Podsumowanie zawodowe | Profesyonel Özet | สรุปวิชาชีพ | Ringkasan Profesional | Ringkasan Profesional |
| work_experience | 工作经历 | Work Experience | 職務経歴 | 업무 경험 | Experiencia Laboral | Expérience Professionnelle | Berufserfahrung | Experiência Profissional | Опыт работы | الخبرة العملية | कार्य अनुभव | Kinh nghiệm làm việc | Esperienza Lavorativa | Doświadczenie zawodowe | İş Deneyimi | ประสบการณ์การทำงาน | Pengalaman Kerja | Pengalaman Kerja |
| education | 教育背景 | Education | 学歴 | 학력 | Educación | Formation | Ausbildung | Educação | Образование | التعليم | शिक्षा | Học vấn | Istruzione | Wykształcenie | Eğitim | การศึกษา | Pendidikan | Pendidikan |
| skills | 专业技能 | Skills | スキル | 기술 | Habilidades | Compétences | Fähigkeiten | Habilidades | Навыки | المهارات | कौशल | Kỹ năng | Competenze | Umiejętności | Yetenekler | ทักษะ | Keterampilan | Kemahiran |
| projects | 项目经历 | Projects | プロジェクト | 프로젝트 | Proyectos | Projets | Projekte | Projetos | Проекты | المشاريع | परियोजनाएँ | Dự án | Progetti | Projekty | Projeler | โครงการ | Proyek | Projek |
| certifications | 证书资质 | Certifications | 資格 | 자격증 | Certificaciones | Certifications | Zertifizierungen | Certificações | Сертификаты | الشهادات | प्रमाणपत्र | Chứng chỉ | Certificazioni | Certyfikaty | Sertifikalar | ใบรับรอง | Sertifikasi | Pensijilan |
| languages | 语言能力 | Languages | 言語 | 언어 | Idiomas | Langues | Sprachen | Idiomas | Языки | اللغات | भाषाएँ | Ngôn ngữ | Lingue | Języki | Diller | ภาษา | Bahasa | Bahasa |
| contact | 联系方式 | Contact | 連絡先 | 연락처 | Contacto | Contact | Kontakt | Contato | Контакты | تواصل | संपर्क | Liên hệ | Contatto | Kontakt | İletişim | ติดต่อ | Kontak | Hubungan |

### 4.2 UI 标签翻译表

| UI Key | 中文 | English | 日本語 | 한국어 | Español | Français | Deutsch | Português | Русский | العربية | हिन्दी | Tiếng Việt | Italiano | Polski | Türkçe | ไทย | Bahasa Indonesia | Bahasa Melayu |
|--------|------|---------|--------|--------|---------|----------|---------|-----------|---------|---------|--------|------------|----------|--------|--------|-----|------------------|---------------|
| present | 至今 | Present | 現在 | 현재 | Actualidad | Présent | Aktuell | Atual | Настоящее время | الحاضر | वर्तमान | Hiện tại | Attuale | Obecnie | Devam ediyor | ปัจจุบัน | Saat ini | Kini |
| years_exp | 年经验 | Years Exp | 年の経験 | 년 경험 | Años de exp. | Années d'exp. | Jahre Erf. | Anos de exp. | Лет опыта | سنوات الخبرة | वर्षों का अनुभव | Năm kinh nghiệm | Anni di esp. | Lata dośw. | Yıl deneyim | ปีประสบการณ์ | Tahun pengalaman | Tahun pengalaman |
| at | 于 | at | において | 에서 | en | chez | bei | na | в | في | पर | tại | presso | w | şirketinde | ที่ | di | di |

---

## 五、实施步骤

### Phase 1：基础设施改造（预计 2-3 天）

1. **模板结构改造**
   - 在所有 11 套模板中提取所有硬编码文本为 `{{SECTION_KEY}}` 占位符
   - 创建 `i18n/` 目录，按语言代码组织 JSON 翻译文件
   - 示例：`i18n/es.json`, `i18n/ar.json`

2. **RTL 基础框架**
   - 在基础模板中添加 `dir="{{DIRECTION}}"` 动态属性
   - 创建 `rtl-base.css` 逻辑属性覆盖文件
   - 为所有 11 套模板添加 `[dir="rtl"]` 适配规则

3. **字体加载系统**
   - 实现基于语言代码的动态 `<link>` 插入脚本
   - 创建字体加载映射表（见 2.3）

### Phase 2：高优先级语言（第一梯队，预计 4-5 天）

按顺序实现：
1. 西班牙语（es）- 拉丁字母，验证字体系统
2. 法语（fr）- 验证变音符号渲染
3. 德语（de）- 验证变音符号渲染
4. 葡萄牙语（pt）- 验证拉丁扩展
5. 俄语（ru）- 验证西里尔字母
6. 阿拉伯语（ar）- **重点验证 RTL 全流程**

每语言需完成：
- [ ] 翻译 JSON 文件
- [ ] 模板渲染测试（所有 11 套风格）
- [ ] PDF 导出测试
- [ ] ATS 模板测试
- [ ] 打印样式测试

### Phase 3：中优先级语言（第二梯队，预计 5-6 天）

按顺序实现：
1. 印地语（hi）- 天城文
2. 越南语（vi）- 拉丁扩展 + 声调
3. 意大利语（it）- 拉丁字母
4. 波兰语（pl）- 拉丁扩展
5. 土耳其语（tr）- 拉丁扩展
6. 泰语（th）- 泰文
7. 印尼语（id）- 拉丁字母
8. 马来语（ms）- 拉丁字母

### Phase 4：集成与测试（预计 3-4 天）

1. **SKILL.md 更新**
   - 更新语言支持列表（4 → 18）
   - 添加 RTL 使用说明
   - 更新字体加载说明

2. **自动化测试**
   - 创建批量渲染测试脚本（18 语言 × 11 风格 = 198 个组合）
   - 验证所有占位符正确替换
   - 验证 PDF 导出无乱码

3. **文档更新**
   - 更新 USER-GUIDE.md
   - 添加各语言排版注意事项

---

## 六、技术实现细节

### 6.1 翻译文件结构

```json
// i18n/es.json
{
  "lang": "es",
  "direction": "ltr",
  "font_family": "var(--font-latin)",
  "sections": {
    "professional_summary": "Resumen Profesional",
    "work_experience": "Experiencia Laboral",
    "education": "Educación",
    "skills": "Habilidades",
    "projects": "Proyectos",
    "certifications": "Certificaciones",
    "languages": "Idiomas",
    "contact": "Contacto"
  },
  "ui": {
    "present": "Actualidad",
    "years_exp": "Años de exp.",
    "at": "en"
  }
}
```

```json
// i18n/ar.json
{
  "lang": "ar",
  "direction": "rtl",
  "font_family": "var(--font-arabic)",
  "sections": {
    "professional_summary": "ملخص مهني",
    "work_experience": "الخبرة العملية",
    "education": "التعليم",
    "skills": "المهارات",
    "projects": "المشاريع",
    "certifications": "الشهادات",
    "languages": "اللغات",
    "contact": "تواصل"
  },
  "ui": {
    "present": "الحاضر",
    "years_exp": "سنوات الخبرة",
    "at": "في"
  }
}
```

### 6.2 模板中的动态渲染

```html
<!-- 在模板头部加载对应语言的 CSS 变量 -->
<style>
  :root {
    --current-font: {{FONT_FAMILY}};
    --current-direction: {{DIRECTION}};
  }
  body {
    font-family: var(--current-font);
    direction: var(--current-direction);
  }
</style>

<!-- Section 标题示例 -->
<h2 class="section-title">{{SECTION_PROFESSIONAL_SUMMARY}}</h2>
```

### 6.3 阿拉伯语日期格式

阿拉伯语日期需使用伊斯兰历或公历格式：

```html
<!-- 公历格式（简历通用） -->
<span dir="ltr">2020 - 2023</span>

<!-- 或阿拉伯语月份 -->
<span>يناير 2020 - مارس 2023</span>
```

### 6.4 技能条 RTL 适配

```css
/* LTR 默认 */
.skill-bar-fill {
  transform-origin: left;
  animation: fillBar 1s ease forwards;
}

/* RTL 覆盖 */
[dir="rtl"] .skill-bar-fill {
  transform-origin: right;
}
```

---

## 七、风险与应对

| 风险 | 影响 | 应对措施 |
|------|------|----------|
| Google Fonts 在某些地区无法访问 | 字体加载失败 | 提供本地字体回退；使用 `system-ui` 作为最终 fallback |
| 阿拉伯语 RTL 布局破坏现有设计 | 高 | 为每套模板单独测试 RTL；准备 RTL 专用变体 |
| 天城文/泰文字符高度异常 | 中 | 调整行高和字号；使用 Noto Sans 系列确保一致性 |
| PDF 导出时非拉丁字符乱码 | 高 | 确保 Playwright 使用支持 Unicode 的 Chromium；嵌入字体子集 |
| 翻译量巨大（14 语言 × ~50 个 key） | 中 | 使用 AI 辅助翻译 + 母语者审核；分阶段交付 |

---

## 八、文件结构规划

```
resume-design-pro/
├── i18n/
│   ├── zh.json          # 中文（已有）
│   ├── en.json          # 英文（已有）
│   ├── ja.json          # 日语（已有）
│   ├── ko.json          # 韩语（已有）
│   ├── es.json          # 西班牙语（新增）
│   ├── fr.json          # 法语（新增）
│   ├── de.json          # 德语（新增）
│   ├── pt.json          # 葡萄牙语（新增）
│   ├── ru.json          # 俄语（新增）
│   ├── ar.json          # 阿拉伯语（新增，RTL）
│   ├── hi.json          # 印地语（新增）
│   ├── vi.json          # 越南语（新增）
│   ├── it.json          # 意大利语（新增）
│   ├── pl.json          # 波兰语（新增）
│   ├── tr.json          # 土耳其语（新增）
│   ├── th.json          # 泰语（新增）
│   ├── id.json          # 印尼语（新增）
│   └── ms.json          # 马来语（新增）
├── templates/
│   ├── template-01-minimalism.html
│   ├── ...
│   ├── template-11-organic.html
│   ├── ats-template.html
│   └── cover-letter-template.html
├── styles/
│   ├── rtl-base.css     # RTL 逻辑属性覆盖（新增）
│   └── fonts.css        # 动态字体加载（新增）
└── scripts/
    ├── export-pdf.js
    ├── export-pdf-batch.js
    └── i18n-validator.js  # 翻译完整性检查（新增）
```

---

## 九、验收标准

- [ ] 18 种语言的翻译 JSON 文件完整且格式统一
- [ ] 所有 11 套模板支持 18 种语言渲染
- [ ] 阿拉伯语 RTL 布局在所有模板中正确显示
- [ ] PDF 导出无乱码、无截断
- [ ] ATS 模板支持所有 18 种语言
- [ ] 打印样式在所有语言下保持一致
- [ ] SKILL.md 文档已更新语言支持列表

---

*计划制定完成，可立即开始 Phase 1 实施。*
