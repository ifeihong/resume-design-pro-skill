const { chromium } = require('playwright');
const path = require('path');

async function debugPDFExport() {
  const htmlPath = path.resolve('d:/trae/test-resume-10-dark-oled.html');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);
  await page.setViewportSize({ width: 794, height: 1123 });

  // Emulate print mode
  await page.emulateMedia({ media: 'print' });

  // Force set background via JavaScript before PDF export
  await page.evaluate(() => {
    document.documentElement.style.setProperty('background-color', '#000000', 'important');
    document.body.style.setProperty('background-color', '#000000', 'important');
    document.documentElement.style.background = '#000000';
    document.body.style.background = '#000000';
    console.log('Forced background to #000000');
    console.log('HTML bg:', document.documentElement.style.background);
    console.log('Body bg:', document.body.style.background);
  });

  // Export PDF with various options
  await page.pdf({
    path: 'd:/trae/dark-oled-forced.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    background: true,  // This might help
  });
  console.log('PDF with forced background exported');

  // Also try with page setup
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  console.log('PDF buffer size:', pdfBuffer.length);

  await browser.close();
}

debugPDFExport().catch(console.error);
