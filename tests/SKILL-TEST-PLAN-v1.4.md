# Resume Design Pro v1.4 - 全面测试方案

## 测试目标
在正式发布前，全面验证 SKILL.md 中定义的所有功能模块是否按预期工作。

## 测试方法
由于 SKILL 是 AI 指令集，测试方式为：
1. 准备标准化测试数据（模拟用户输入）
2. 按 SKILL 指令流程逐步验证每个决策点
3. 检查输出是否符合 SKILL 中定义的格式和规范
4. 验证生成的 HTML/CSS/JS 文件质量

---

## 测试数据准备

### 测试用例 A：标准中文简历（5年经验，产品经理）
```yaml
personal:
  name: 陈晓明
  phone: 138-1234-5678
  email: chenxiaoming@email.com
  city: 上海
  linkedin: linkedin.com/in/chenxiaoming
  github: github.com/chenxm

target:
  role: 高级产品经理
  industry: 互联网/SaaS

summary: 5年互联网产品经验，专注B端SaaS产品。主导过3个从0到1的产品，服务超过10万企业用户。擅长需求分析、数据驱动决策和跨团队协作。

experience:
  - company: 字节跳动
    role: 产品经理
    period: 2022-03 至 2024-06
    highlights:
      - 负责飞书文档协作模块，DAU从50万增长到200万
      - 设计并落地实时协作引擎，延迟降低60%
      - 管理5人产品团队，协调研发、设计、运营资源
  - company: 阿里巴巴
    role: 产品专员
    period: 2020-07 至 2022-02
    highlights:
      - 参与钉钉考勤模块优化，用户满意度提升25%
      - 完成20+需求文档撰写，推动10个功能上线
      - 支持运营团队完成3次大型活动策划

education:
  - school: 复旦大学
    degree: 本科
    major: 计算机科学与技术
    period: 2016-09 至 2020-06

skills:
  categories:
    - name: 产品工具
      items: [Axure, Figma, Sketch, XMind, ProcessOn]
    - name: 数据分析
      items: [SQL, Python, Tableau, Excel高级]
    - name: 项目管理
      items: [敏捷开发, JIRA, Confluence, Scrum]

projects:
  - name: 智能文档助手
    description: 基于AI的文档智能生成工具
    tech_stack: [React, Node.js, OpenAI API]
```

### 测试用例 B：英文简历（10年经验，技术高管）
```yaml
personal:
  name: Michael Zhang
  phone: +1-415-555-0123
  email: michael.zhang@techleader.com
  city: San Francisco, CA
  linkedin: linkedin.com/in/michaelzhang

target:
  role: VP of Engineering
  industry: Fintech

summary: 10+ years of engineering leadership in fintech. Built and scaled engineering teams from 5 to 50. Led architecture for payment platforms processing $1B+ annually.

experience:
  - company: Stripe
    role: Engineering Manager
    period: 2020-01 to present
    highlights:
      - Led team of 15 engineers building payment infrastructure
      - Reduced payment failure rate from 8% to 2%
      - Architected real-time fraud detection system
  - company: PayPal
    role: Senior Software Engineer
    period: 2016-06 to 2019-12
    highlights:
      - Developed mobile payment SDK used by 500+ merchants
      - Improved API response time by 40% through caching optimization
      - Mentored 3 junior engineers to senior level

education:
  - school: Stanford University
    degree: MS
    major: Computer Science
    period: 2014-09 to 2016-06

skills:
  categories:
    - name: Backend
      items: [Java, Go, Python, Microservices, Kafka]
    - name: Cloud
      items: [AWS, Kubernetes, Terraform, Docker]
    - name: Leadership
      items: [Team Building, Agile, Technical Strategy]
```

### 测试用例 C：日文简历（3年经验，设计师）
```yaml
personal:
  name: 田中 美咲
  phone: 090-1234-5678
  email: tanaka.misaki@design.jp
  city: 東京都渋谷区

target:
  role: UI/UXデザイナー
  industry: ゲーム/モバイルアプリ

summary: 3年間のUI/UXデザイン経験。モバイルゲームとSNSアプリのデザインを担当。ユーザー調査からプロトタイピングまで一貫して対応可能。

experience:
  - company: 株式会社Cygames
    role: UIデザイナー
    period: 2022-04 〜 現在
    highlights:
      - 人気RPGゲームのUIリニューアルプロジェクトを主導
      - ユーザビリティテストを実施し、課金率15%向上に貢献
      - デザインシステムを構築し、開発効率30%向上
  - company: 株式会社DeNA
    role: アシスタントデザイナー
    period: 2021-04 〜 2022-03
    highlights:
      - モバイルゲームのイベント画面デザインを担当
      - 10以上のバナー広告を制作
      - デザインチームのデイリースタンドアップをファシリテート

education:
  - school: 多摩美術大学
    degree: 学士
    major: 情報デザイン学科
    period: 2017-04 〜 2021-03

skills:
  categories:
    - name: デザインツール
      items: [Figma, Adobe XD, Photoshop, Illustrator]
    - name: プロトタイピング
      items: [Protopie, Principle, After Effects]
```

### 测试用例 D：韩文简历（7年经验，数据科学家）
```yaml
personal:
  name: 김민준
  phone: 010-1234-5678
  email: minjun.kim@data.kr
  city: 서울시 강남구

target:
  role: 수석 데이터 과학자
  industry: 전자상거래

summary: 7년간의 데이터 사이언스 경험. 대형 전자상거래 플랫폼의 추천 시스템과 예측 모델을 구축. 머신러닝 파이프라인 설계 및 운영 전문.

experience:
  - company: 쿠팡
    role: 데이터 과학자
    period: 2020-03 ~ 현재
    highlights:
      - 실시간 추천 시스템 구축, 클릭률 25% 향상
      - 재고 예측 모델 개발, 품절률 40% 감소
      - 데이터 과학팀 8명 리드
  - company: 네이버
    role: 주니어 데이터 분석가
    period: 2017-07 ~ 2020-02
    highlights:
      - 검색 로그 분석을 통한 사용자 행동 패턴 도출
      - A/B 테스트 설계 및 결과 분석 50건+
      - Python 기반 자동화 보고서 시스템 구축

education:
  - school: 서울대학교
    degree: 석사
    major: 컴퓨터공학과
    period: 2015-03 ~ 2017-02

skills:
  categories:
    - name: 프로그래밍
      items: [Python, R, SQL, Scala]
    - name: 머신러닝
      items: [TensorFlow, PyTorch, XGBoost, Scikit-learn]
    - name: 빅데이터
      items: [Spark, Hadoop, Airflow, Kafka]
```

### 测试用例 E：边界测试（超长内容、特殊字符）
```yaml
personal:
  name: 测试用户 VeryLongNameThatMightBreakLayout
  phone: +86-138-0000-0000
  email: test@very-long-domain-name-that-might-cause-issues.com
  city: 北京市朝阳区建国路88号SOHO现代城A座1201室（超长地址测试）

summary: 这是一段非常长的个人简介，用来测试布局是否能正确处理长文本。包含中英文混合内容：Experienced professional with 10+ years in software development, specializing in distributed systems and cloud architecture. 熟悉微服务架构、容器化部署和DevOps实践。曾主导多个大型项目的技术架构设计，团队规模从5人扩展到50人。擅长技术选型、性能优化和团队建设。

experience:
  - company: 超长公司名称测试科技有限公司（北京）股份有限公司
    role: 高级技术总监兼首席架构师兼DevOps负责人
    period: 2020-01 至 2024-12
    highlights:
      - 这是一个超长的项目描述，用来测试布局是否能正确处理长文本内容。项目涉及多个技术栈，包括Java、Spring Boot、Kubernetes、Docker、Terraform、AWS等。
      - 带领团队完成了一个超大型项目，涉及100+微服务，日处理请求量达到10亿级别，系统可用性达到99.999%。
      - 优化了系统性能，将响应时间从500ms降低到50ms，提升了10倍性能。

skills:
  categories:
    - name: 编程语言
      items: [Java, Python, JavaScript, TypeScript, Go, Rust, C++, C#, Scala, Kotlin, Swift, Ruby, PHP, Perl, Lua, Haskell, Erlang, Clojure, F#, Dart]
```

---

## 测试轮次

### Round 1: 核心功能测试
**目标**：验证 5 种输入方式、内容优化引擎、风格选择、PDF/PNG 导出

| 测试项 | 测试用例 | 预期结果 | 状态 |
|--------|---------|---------|------|
| 输入方式1-上传 | A | 正确解析并展示 | ⬜ |
| 输入方式2-对话 | A | 按模块收集信息 | ⬜ |
| 输入方式3-粘贴 | A | 正确解析结构 | ⬜ |
| 输入方式4-快速 | A | 6个问题后生成 | ⬜ |
| 输入方式5-RAW | A | 不做内容优化 | ⬜ |
| 内容优化-默认 | A | 10步流程执行 | ⬜ |
| 内容优化-确认 | A | 展示对比并等待确认 | ⬜ |
| 风格选择-推荐 | A | 基于岗位推荐3个风格 | ⬜ |
| 风格选择-29全选 | A | 展示所有29个风格 | ⬜ |
| PDF导出 | A | A4格式，背景正确 | ⬜ |
| PNG导出 | A | 2x A4分辨率 | ⬜ |

### Round 2: 多语言测试
**目标**：验证中/英/日/韩四种语言的完整流程

| 测试项 | 测试用例 | 预期结果 | 状态 |
|--------|---------|---------|------|
| 中文-完整流程 | A | 中文界面、中文内容、中文字体 | ⬜ |
| 英文-完整流程 | B | 英文界面、英文内容、英文字体 | ⬜ |
| 日文-完整流程 | C | 日文界面、日文内容、日文字体 | ⬜ |
| 韩文-完整流程 | D | 韩文界面、韩文内容、韩文字体 | ⬜ |
| 语言检测 | A/B/C/D | 自动检测用户输入语言 | ⬜ |
| 手动切换 | A | `/lang en` 切换为英文 | ⬜ |
| 文化适配 | A | 中文姓名顺序、日期格式 | ⬜ |

### Round 3: 边界测试
**目标**：验证极端情况下的系统稳定性

| 测试项 | 测试用例 | 预期结果 | 状态 |
|--------|---------|---------|------|
| 超长内容 | E | 不溢出，合理截断或分页 | ⬜ |
| 特殊字符 | E | 正确渲染，不破坏HTML | ⬜ |
| 空数据 | (空) | 优雅处理，提示补充 | ⬜ |
| 单段经历 | (简) | 正常生成，不报错 | ⬜ |
| 10+段经历 | (繁) | 多页PDF，页脚正确 | ⬜ |
| 无头像 | A | 布局自适应，姓名放大 | ⬜ |
| 深色主题PDF | 10/21/22 | 无白边，背景全黑 | ⬜ |
| 浅色主题PDF | 01/12/13 | 白底，文字清晰 | ⬜ |

### Round 4: 交付物测试
**目标**：验证 10 个交付物的完整性和正确性

| # | 交付物 | 测试项 | 状态 |
|---|--------|--------|------|
| 1 | Visual HTML | 样式正确、动画正常、响应式 | ⬜ |
| 2 | PDF | A4尺寸、字体正确、背景完整 | ⬜ |
| 3 | PNG | 2x A4、无压缩失真 | ⬜ |
| 4 | ATS HTML | 纯文本、标准结构、无装饰 | ⬜ |
| 5 | Markdown | 结构清晰、易编辑 | ⬜ |
| 6 | Cover Letter | 格式正确、针对公司定制 | ⬜ |
| 7 | LinkedIn Export | 分段清晰、复制粘贴友好 | ⬜ |
| 8 | Job Search Kit | 静态报告、占位符可替换 | ⬜ |
| 9 | Interview Prep | 问题卡片、可展开 | ⬜ |
| 10 | Resume Diagnosis | 6维评分、进度条动画 | ⬜ |

### Round 5: 回归测试
**目标**：验证新增/修改功能未破坏已有功能

| 测试项 | 测试内容 | 状态 |
|--------|---------|------|
| RAW模式 | `/raw` 切换、内容不优化 | ⬜ |
| 头像系统 | 4种头像方式、平台检测 | ⬜ |
| JSON持久化 | 保存/加载/查找最新 | ⬜ |
| 打印优化 | @page规则、footer位置 | ⬜ |
| 多页处理 | 页眉页脚、分页符 | ⬜ |
| 对比度检查 | WCAG AA、深色主题 | ⬜ |
| 减少动画 | `prefers-reduced-motion` | ⬜ |

---

## 测试执行方式

由于 SKILL 是 AI 指令集，实际测试需要：
1. 在支持 SKILL 的 AI 平台（如 Trae、Claude Code、Cursor）上加载 SKILL.md
2. 使用上述测试用例作为用户输入
3. 记录 AI 的每一步响应
4. 检查生成的文件质量
5. 对比预期结果

## 测试通过标准

- **P0（阻塞）**：核心功能必须100%通过（输入、优化、生成、导出）
- **P1（重要）**：多语言和交付物必须90%+通过
- **P2（一般）**：边界情况 gracefully degrade 即可

## 测试报告模板

每个测试用例记录：
- 测试时间
- 测试环境（AI平台版本）
- 输入数据
- 实际输出
- 与预期对比
- 问题截图/日志
- 严重程度（P0/P1/P2）
