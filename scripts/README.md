# Resume Design Pro - PDF Export

PDF export scripts for Resume Design Pro templates.

## Quick Start

```bash
# Install dependencies (first time only)
npm install

# Export a single resume to PDF
node export-pdf.js ../templates/template-01-minimalism.html

# Export with custom output name
node export-pdf.js ../templates/template-01-minimalism.html my-resume.pdf
```

## Batch Export

Export multiple resumes at once:

```bash
# Export all HTML files in current folder
node export-pdf-batch.js *.html

# Export specific files
node export-pdf-batch.js resume-cyberpunk.html resume-minimalism.html

# Export to a specific folder
node export-pdf-batch.js *.html --output-dir ./pdf-output

# Export with custom header/footer
node export-pdf-batch.js *.html --header "My Resume" --footer "Confidential"

# Export without background colors
node export-pdf-batch.js *.html --no-background
```

### Batch Export Use Cases

| Scenario | Description |
|----------|-------------|
| Multi-style comparison | Generate same resume in multiple styles, export all to compare |
| Multi-target applications | Tailored resumes for different companies, export to one folder |
| Team processing | HR batch exports resumes for multiple candidates |
| A/B testing | Test different visual styles for job application effectiveness |

## Batch Export Options

| Option | Description |
|--------|-------------|
| `-o, --output-dir <dir>` | Output directory (default: current directory) |
| `-H, --header <text>` | Custom header text for each page |
| `-F, --footer <text>` | Custom footer text for each page |
| `--no-background` | Export without background colors |
| `-h, --help` | Show help |

## Requirements

- Node.js >= 16.0.0
- Playwright will auto-download Chromium on first run

## Features

- A4 page size with 15mm margins
- Preserves background colors and styles
- Adds page numbers in footer
- Custom header/footer support
- Waits for fonts to load before export
- Supports all 11 design styles
- Progress bar with success/fail summary

## Troubleshooting

**Error: Cannot find module 'playwright'**
```bash
npm install
```

**Error: Executable doesn't exist**
Playwright will auto-download Chromium. If it fails:
```bash
npx playwright install chromium
```
