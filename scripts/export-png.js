/**
 * Resume Design Pro - PNG Export (Fallback when Playwright is unavailable)
 * Uses Puppeteer or Chrome Headless to capture screenshot of resume HTML
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function exportPNG(inputFile, outputFile) {
  // Validate input
  if (!inputFile) {
    console.error('❌ Error: Please provide an HTML file path');
    console.log('Usage: node export-png.js <input-html-file> [output-png-file]');
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
    outputFile = `${basename}.png`;
  }
  const outputPath = path.resolve(outputFile);

  console.log(`📸 Exporting PNG screenshot...`);
  console.log(`   Input:  ${inputPath}`);
  console.log(`   Output: ${outputPath}`);

  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Load HTML file
    const fileUrl = 'file:///' + inputPath.replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle' });

    // Wait for fonts to load
    await page.waitForFunction(() => document.fonts.ready);

    // Ensure background extends to full page height for screenshot
    await page.evaluate(() => {
      const auroraBg = document.querySelector('.aurora-bg');
      if (auroraBg) {
        auroraBg.style.position = 'absolute';
        auroraBg.style.height = document.documentElement.scrollHeight + 'px';
      }
      const meshGradient = document.querySelector('.mesh-gradient');
      if (meshGradient) {
        meshGradient.style.position = 'absolute';
        meshGradient.style.height = document.documentElement.scrollHeight + 'px';
      }
      // Ensure html/body have minimum height
      document.documentElement.style.minHeight = document.documentElement.scrollHeight + 'px';
      document.body.style.minHeight = document.documentElement.scrollHeight + 'px';
    });

    // Set viewport to A4 size at 2x resolution for high quality
    await page.setViewportSize({ width: 794 * 2, height: 1123 * 2 });

    // Take full page screenshot
    await page.screenshot({
      path: outputPath,
      fullPage: true,
      type: 'png'
    });

    await browser.close();

    // Get file size
    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(1);

    console.log(`✅ PNG exported successfully!`);
    console.log(`   Size: ${sizeKB} KB`);
    console.log(`   Resolution: 1588×2246 (2x A4)`);
    console.log(`   Location: ${outputPath}`);
    console.log(`\n💡 Note: PNG is a screenshot, not a document. Text is not selectable.`);
    console.log(`   For searchable PDF, install Playwright: pip install playwright && playwright install chromium`);

  } catch (error) {
    console.error('❌ Export failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Ensure Playwright is installed: pip install playwright');
    console.log('   2. Install browser binaries: playwright install chromium');
    console.log('   3. Or use the browser print() method as alternative');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  const [,, inputFile, outputFile] = process.argv;
  exportPNG(inputFile, outputFile);
}

module.exports = { exportPNG };
