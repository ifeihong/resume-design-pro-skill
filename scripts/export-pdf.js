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
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Load HTML file (use file URL with forward slashes for cross-platform compatibility)
    const fileUrl = 'file:///' + inputPath.replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle' });

    // Wait for fonts to load using a more reliable method
    await page.waitForFunction(() => document.fonts.ready);

    // Set viewport to match A4 width for accurate layout rendering
    await page.setViewportSize({ width: 794, height: 1123 }); // A4 at 96dpi

    // Generate PDF — margins controlled by CSS @page rule, not here
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-size: 9px; width: 100%; text-align: center; color: #999; font-family: sans-serif; padding-bottom: 10mm;">
          <span class="pageNumber"></span> / <span class="totalPages"></span>
        </div>
      `
    });

    await browser.close();

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
