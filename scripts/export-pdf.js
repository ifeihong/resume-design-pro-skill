/**
 * Resume Design Pro - PDF Export Script
 * Usage: node export-pdf.js <input-html-file> [output-pdf-file]
 * Example: node export-pdf.js resume-liming-cyberpunk.html
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function exportPDF(inputFile, outputFile) {
  // Validate input
  if (!inputFile) {
    console.error('❌ Error: Please provide an HTML file path');
    console.log('Usage: node export-pdf.js <input-html-file> [output-pdf-file]');
    console.log('Example: node export-pdf.js resume-liming-cyberpunk.html');
    process.exit(1);
  }

  const inputPath = path.resolve(inputFile);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Error: File not found: ${inputPath}`);
    process.exit(1);
  }

  // Default output filename
  if (!outputFile) {
    const basename = path.basename(inputFile, '.html');
    outputFile = `${basename}.pdf`;
  }
  const outputPath = path.resolve(outputFile);

  console.log(`📄 Exporting PDF...`);
  console.log(`   Input:  ${inputPath}`);
  console.log(`   Output: ${outputPath}`);

  try {
    // Read HTML content and inject hardcoded background color on <html> tag
    // This is necessary because Playwright PDF export does not reliably
    // render CSS variable-based backgrounds on the <html> element.
    // Hardcoded inline style on <html> is the only reliable method.
    let htmlContent = fs.readFileSync(inputPath, 'utf-8');

    // Extract --color-surface value from CSS (not --color-bg)
    // Using --color-surface ensures the entire page matches the container background
    const colorSurfaceMatch = htmlContent.match(/--color-surface:\s*([^;}"'`]+)/);
    const colorSurface = colorSurfaceMatch ? colorSurfaceMatch[1].trim() : '#ffffff';

    // Inject hardcoded background on <html> tag
    // Remove any existing style on <html> first, then add our own
    htmlContent = htmlContent.replace(
      /<html([^>]*)\s*style="[^"]*"\s*>/i,
      `<html$1 style="background-color: ${colorSurface};">`
    );
    // If <html> has no style attribute, add one
    if (!htmlContent.match(/<html[^>]*style=/i)) {
      htmlContent = htmlContent.replace(
        /<html([^>]*)>/i,
        `<html$1 style="background-color: ${colorSurface};">`
      );
    }

    // Write modified HTML to temp file
    const tempHtml = path.join(path.dirname(inputPath), '._temp_pdf_export.html');
    fs.writeFileSync(tempHtml, htmlContent, 'utf-8');

    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Load modified HTML file
    const fileUrl = 'file:///' + tempHtml.replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle' });

    // Wait for fonts to load
    await page.waitForFunction(() => document.fonts.ready);

    // Set viewport to match A4 width for accurate layout rendering
    await page.setViewportSize({ width: 794, height: 1123 }); // A4 at 96dpi

    // Generate PDF
    // Note: margin is controlled by CSS @page rule, not here
    // @page { margin: 18mm 22mm; background: var(--color-bg); }
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: false
    });

    await browser.close();

    // Clean up temp file
    try { fs.unlinkSync(tempHtml); } catch (e) {}

    // Get file size
    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(1);

    console.log(`✅ PDF exported successfully!`);
    console.log(`   Size: ${sizeKB} KB`);
    console.log(`   Location: ${outputPath}`);

  } catch (error) {
    console.error('❌ Export failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  const [,, inputFile, outputFile] = process.argv;
  exportPDF(inputFile, outputFile);
}

module.exports = { exportPDF };
