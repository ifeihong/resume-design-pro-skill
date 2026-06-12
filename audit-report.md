# 简历模板一致性审计报告

## 审计范围
- 审计文件：11 个 template-*.html 文件（排除 cover-letter-template.html）
- 审计日期：2026-06-12

---

## 一、逐模板审计结果

### 1. template-01-minimalism.html

| 检查项 | 状态 | 备注 |
|--------|------|------|
| 占位符一致性 | PASS | 全部 10 个占位符均存在 |
| Title 标签格式 | PASS | `{{NAME}} - {{TITLE}} \| Minimalism Resume` |
| Google Fonts | PASS | 包含 Noto Sans SC, Noto Sans JP, Noto Sans KR, JetBrains Mono（额外含 Noto Serif SC） |
| 头像系统 | PASS | 含 AVATAR_SRC、avatar-abstract、no-avatar、注释说明 |
| 打印样式 | PASS | @page A4 15mm、break-inside:avoid、动画禁用、装饰隐藏 |
| 减弱动效 | PASS | prefers-reduced-motion: reduce |
| 响应式 | PASS | @media (max-width: 768px) |
| 语义 HTML | PASS | header, section, footer + id 属性 |
| 章节标题 | PASS | 个人简介, 技能专长, 工作经历, 项目作品, 教育背景, 语言能力 |
| 演示内容 | PASS | 李明/高级前端工程师, 字节跳动, 蚂蚁集团, 京东 |

**问题数：0**

---

### 2. template-02-neumorphism.html

| 检查项 | 状态 | 备注 |
|--------|------|------|
| 占位符一致性 | PASS | 全部 10 个占位符均存在 |
| Title 标签格式 | PASS | `{{NAME}} - {{TITLE}} \| Neumorphism Resume` |
| Google Fonts | PASS | 包含全部 4 种字体 |
| 头像系统 | PASS | 含 AVATAR_SRC、avatar-abstract、no-avatar、注释说明 |
| 打印样式 | PASS | 完整 |
| 减弱动效 | PASS | 完整 |
| 响应式 | PASS | 完整 |
| 语义 HTML | PASS | header, section, footer + id 属性 |
| 章节标题 | PASS | 全部中文 |
| 演示内容 | PASS | 字节跳动, 蚂蚁集团, 京东 |

**问题数：0**

---

### 3. template-03-glassmorphism.html

| 检查项 | 状态 | 备注 |
|--------|------|------|
| 占位符一致性 | PASS | 全部 10 个占位符均存在 |
| Title 标签格式 | PASS | |
| Google Fonts | PASS | |
| 头像系统 | PASS | |
| 打印样式 | PASS | |
| 减弱动效 | PASS | |
| 响应式 | PASS | |
| 语义 HTML | PASS | |
| 章节标题 | PASS | |
| 演示内容 | **MEDIUM** | 公司名称附加了英文名：`字节跳动 / ByteDance`、`蚂蚁集团 / Ant Group`、`京东 / JD.com`，与其他模板不一致 |

**问题数：1**

---

### 4. template-04-cyberpunk.html

| 检查项 | 状态 | 备注 |
|--------|------|------|
| 占位符一致性 | PASS | 全部 10 个占位符均存在 |
| Title 标签格式 | PASS | |
| Google Fonts | PASS | 含全部 4 种（额外含 Orbitron） |
| 头像系统 | **MEDIUM** | 缺少头像选项注释说明（其他模板有 `<!-- Avatar: {{AVATAR_TYPE}} -->` 等三行注释） |
| 打印样式 | PASS | |
| 减弱动效 | PASS | |
| 响应式 | PASS | |
| 语义 HTML | **MEDIUM** | 使用 `profile-header` 而非标准 header 类名；section id 使用 `summary`/`experience` 而非 `professional-summary`/`work-experience` |
| 章节标题 | PASS | |
| 演示内容 | **MEDIUM** | 工作经历描述为纯段落文本（experience-desc），而非其他模板使用的 ul/li + metric 高亮格式；项目描述也不同于标准格式；CSS Glass Generator 技术栈为 `Vue.js, Canvas, Vite` 而非标准的 `Vue.js, Tailwind` |

**问题数：3**

---

### 5. template-05-brutalism.html

| 检查项 | 状态 | 备注 |
|--------|------|------|
| 占位符一致性 | PASS | |
| Title 标签格式 | PASS | |
| Google Fonts | PASS | |
| 头像系统 | **MEDIUM** | 缺少头像选项注释说明 |
| 打印样式 | **CRITICAL** | 第一个 `@media print` 块缺少闭合 `}`，第二个 `@media print` 嵌套在第一个内部（CSS 语法错误：第 599 行的 `}` 结束了外层 print，但第 600 行又开启了新的 `@media print`，缺少闭合大括号） |
| 减弱动效 | PASS | |
| 响应式 | PASS | |
| 语义 HTML | **MEDIUM** | section id 使用 `summary`/`experience` 而非 `professional-summary`/`work-experience`；无 footer 标签 |
| 章节标题 | PASS | |
| 演示内容 | **MEDIUM** | 工作经历为纯段落文本格式，非 ul/li + metric 格式；项目技术栈不同（CSS Glass Generator 使用 `Vue.js, Canvas, Vite`） |

**问题数：4**

---

### 6. template-06-claymorphism.html

| 检查项 | 状态 | 备注 |
|--------|------|------|
| 占位符一致性 | PASS | |
| Title 标签格式 | PASS | |
| Google Fonts | PASS | |
| 头像系统 | **MEDIUM** | 缺少头像选项注释说明 |
| 打印样式 | **CRITICAL** | 与 template-05 相同的嵌套 `@media print` 语法错误（第一个 print 块未闭合就开始了第二个） |
| 减弱动效 | PASS | |
| 响应式 | PASS | |
| 语义 HTML | **MEDIUM** | section id 使用 `summary`/`experience` 而非 `professional-summary`/`work-experience`；无 footer 标签 |
| 章节标题 | PASS | |
| 演示内容 | **MEDIUM** | 工作经历为纯段落文本格式；项目技术栈不同（CSS Glass Generator 使用 `Vue.js, Canvas, Vite`） |

**问题数：4**

---

### 7. template-07-aurora.html

| 检查项 | 状态 | 备注 |
|--------|------|------|
| 占位符一致性 | PASS | |
| Title 标签格式 | PASS | |
| Google Fonts | PASS | |
| 头像系统 | PASS | 含注释说明 |
| 打印样式 | **CRITICAL** | 与 template-05/06 相同的嵌套 `@media print` 语法错误 |
| 减弱动效 | PASS | |
| 响应式 | PASS | |
| 语义 HTML | **LOW** | section id 使用 `personal-summary` 而非 `professional-summary` |
| 章节标题 | PASS | |
| 演示内容 | PASS | 标准格式 |

**问题数：2**

---

### 8. template-08-3d-hyperrealism.html

| 检查项 | 状态 | 备注 |
|--------|------|------|
| 占位符一致性 | **MEDIUM** | 额外使用了 `{{NAME_ABBR}}` 占位符（第 918 行），该占位符不在标准 10 个占位符列表中 |
| Title 标签格式 | PASS | |
| Google Fonts | PASS | |
| 头像系统 | PASS | 含注释说明 |
| 打印样式 | **CRITICAL** | 与 template-05/06/07 相同的嵌套 `@media print` 语法错误 |
| 减弱动效 | PASS | |
| 响应式 | PASS | |
| 语义 HTML | **LOW** | section id 使用 `personal-summary` 而非 `professional-summary` |
| 章节标题 | PASS | |
| 演示内容 | PASS | 标准格式 |

**问题数：3**

---

### 9. template-09-vibrant-block.html

| 检查项 | 状态 | 备注 |
|--------|------|------|
| 占位符一致性 | PASS | |
| Title 标签格式 | PASS | |
| Google Fonts | PASS | |
| 头像系统 | PASS | 含注释说明 |
| 打印样式 | **CRITICAL** | 与 template-05/06/07/08 相同的嵌套 `@media print` 语法错误 |
| 减弱动效 | PASS | |
| 响应式 | PASS | |
| 语义 HTML | **LOW** | section id 使用 `personal-summary` 而非 `professional-summary` |
| 章节标题 | PASS | |
| 演示内容 | PASS | 标准格式 |

**问题数：2**

---

### 10. template-10-dark-oled.html

| 检查项 | 状态 | 备注 |
|--------|------|------|
| 占位符一致性 | PASS | |
| Title 标签格式 | PASS | |
| Google Fonts | PASS | |
| 头像系统 | PASS | 含注释说明 |
| 打印样式 | PASS | 两个 `@media print` 块是独立的（非嵌套），语法正确 |
| 减弱动效 | PASS | |
| 响应式 | PASS | |
| 语义 HTML | PASS | 使用 `professional-summary` |
| 章节标题 | PASS | |
| 演示内容 | **LOW** | 工作经历描述措辞与其他模板略有不同（如"负责企业协作平台"vs"负责创意工具平台"），但公司/职位/数据指标一致 |

**问题数：1**

---

### 11. template-11-organic.html

| 检查项 | 状态 | 备注 |
|--------|------|------|
| 占位符一致性 | PASS | |
| Title 标签格式 | PASS | |
| Google Fonts | PASS | |
| 头像系统 | PASS | 含注释说明 |
| 打印样式 | PASS | 两个 `@media print` 块独立，语法正确 |
| 减弱动效 | PASS | |
| 响应式 | PASS | |
| 语义 HTML | PASS | 使用 `professional-summary` |
| 章节标题 | PASS | |
| 演示内容 | **LOW** | 工作经历描述措辞略有不同，项目描述更详细（多了"支持自定义缓动函数和手势交互"等），但核心信息一致 |

**问题数：1**

---

## 二、问题汇总表

| # | 模板 | 问题 | 严重程度 |
|---|------|------|----------|
| 1 | template-03-glassmorphism | 公司名称附加英文名（ByteDance/Ant Group/JD.com），与其他模板不一致 | Medium |
| 2 | template-04-cyberpunk | 缺少头像选项注释说明 | Medium |
| 3 | template-04-cyberpunk | section id 命名不统一（summary/experience vs professional-summary/work-experience） | Medium |
| 4 | template-04-cyberpunk | 工作经历/项目描述格式与其他模板差异较大（纯文本 vs ul/li+metric） | Medium |
| 5 | template-05-brutalism | **CSS 语法错误：嵌套 @media print 未正确闭合** | **Critical** |
| 6 | template-05-brutalism | 缺少头像选项注释说明 | Medium |
| 7 | template-05-brutalism | section id 命名不统一；无 footer 标签 | Medium |
| 8 | template-05-brutalism | 工作经历/项目描述格式与其他模板差异较大 | Medium |
| 9 | template-06-claymorphism | **CSS 语法错误：嵌套 @media print 未正确闭合** | **Critical** |
| 10 | template-06-claymorphism | 缺少头像选项注释说明 | Medium |
| 11 | template-06-claymorphism | section id 命名不统一；无 footer 标签 | Medium |
| 12 | template-06-claymorphism | 工作经历/项目描述格式与其他模板差异较大 | Medium |
| 13 | template-07-aurora | **CSS 语法错误：嵌套 @media print 未正确闭合** | **Critical** |
| 14 | template-07-aurora | section id 使用 `personal-summary` 而非 `professional-summary` | Low |
| 15 | template-08-3d-hyperrealism | **CSS 语法错误：嵌套 @media print 未正确闭合** | **Critical** |
| 16 | template-08-3d-hyperrealism | 额外使用非标准占位符 `{{NAME_ABBR}}` | Medium |
| 17 | template-08-3d-hyperrealism | section id 使用 `personal-summary` 而非 `professional-summary` | Low |
| 18 | template-09-vibrant-block | **CSS 语法错误：嵌套 @media print 未正确闭合** | **Critical** |
| 19 | template-09-vibrant-block | section id 使用 `personal-summary` 而非 `professional-summary` | Low |
| 20 | template-10-dark-oled | 工作经历描述措辞与其他模板略有不同 | Low |
| 21 | template-11-organic | 工作经历/项目描述措辞比其他模板更详细 | Low |

---

## 三、按严重程度统计

| 严重程度 | 数量 | 涉及模板 |
|----------|------|----------|
| **Critical** | **5** | template-05, 06, 07, 08, 09 |
| **Medium** | **10** | template-03, 04, 05, 06, 08 |
| **Low** | **6** | template-07, 08, 09, 10, 11 |

---

## 四、关键发现与建议

### Critical（必须修复）

**CSS @media print 嵌套语法错误** -- 影响 5 个模板（05/06/07/08/09）

这些模板存在相同的结构性 bug：第一个 `@media print` 块的 `}` 闭合后，紧接着又出现第二个 `@media print {`，但缺少外层 `}` 来结束第一个 print 块。这导致 CSS 解析器可能忽略第二个 print 块中的规则。

受影响文件及行号：
- `template-05-brutalism.html` -- 第 530 行 `@media print {` 开始，第 599 行 `}` 后第 600 行又出现 `@media print {`，但第 599 行的 `}` 实际上关闭的是第一个 print 块内部的一个子规则而非整个 print 块
- `template-06-claymorphism.html` -- 第 680 行附近，同样问题
- `template-07-aurora.html` -- 第 614 行附近
- `template-08-3d-hyperrealism.html` -- 第 660 行附近
- `template-09-vibrant-block.html` -- 第 704 行附近

### Medium（建议修复）

1. **演示内容格式不统一**：template-04/05/06 使用纯段落文本描述工作经历，而其他模板使用 ul/li 列表 + metric 高亮。建议统一为 ul/li + metric 格式。

2. **section id 不统一**：`professional-summary` vs `personal-summary` vs `summary`。建议统一为 `professional-summary`。

3. **缺少 footer 标签**：template-04/05/06 没有使用 `<footer>` 语义标签。

4. **缺少头像注释**：template-04/05/06 缺少头像选项的三行注释说明。

5. **非标准占位符**：template-08 使用了 `{{NAME_ABBR}}`，不在标准占位符列表中。

6. **公司名称格式**：template-03 附加了英文名，与其他模板不一致。

### Low（可选修复）

1. 部分 section id 命名差异（`personal-summary` vs `professional-summary`）
2. 工作经历描述措辞存在细微差异（不影响功能）
