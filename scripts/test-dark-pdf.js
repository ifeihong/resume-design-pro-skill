const { chromium } = require('playwright');
const path = require('path');

async function testDarkPDF() {
  const htmlPath = path.resolve('d:/trae/test-resume-10-dark-oled.html');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);
  await page.setViewportSize({ width: 794, height: 1123 });

  // Check body background in NORMAL mode
  const normalBg = await page.evaluate(() => {
    return {
      bodyBg: getComputedStyle(document.body).backgroundColor,
      htmlBg: getComputedStyle(document.documentElement).backgroundColor,
      colorBg: getComputedStyle(document.documentElement).getPropertyValue('--color-bg'),
      colorSurface: getComputedStyle(document.documentElement).getPropertyValue('--color-surface'),
    };
  });
  console.log('=== NORMAL MODE ===');
  console.log(JSON.stringify(normalBg, null, 2));

  // Switch to PRINT mode
  await page.emulateMedia({ media: 'print' });
  
  const printBg = await page.evaluate(() => {
    return {
      bodyBg: getComputedStyle(document.body).backgroundColor,
      htmlBg: getComputedStyle(document.documentElement).backgroundColor,
      colorBg: getComputedStyle(document.documentElement).getPropertyValue('--color-bg'),
    };
  });
  console.log('\n=== PRINT MODE ===');
  console.log(JSON.stringify(printBg, null, 2));

  // Take screenshot in print mode (full page)
  await page.screenshot({ 
    path: 'd:/trae/dark-oled-print-full.png',
    fullPage: true
  });
  console.log('\nFull page print screenshot saved');

  // Export PDF
  await page.pdf({
    path: 'd:/trae/dark-oled-test.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  console.log('PDF exported');

  await browser.close();
}

testDarkPDF().catch(console.error);
