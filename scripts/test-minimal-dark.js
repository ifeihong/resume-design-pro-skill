const { chromium } = require('playwright');
const path = require('path');

async function testMinimalDarkPDF() {
  const htmlPath = path.resolve('d:/trae/dark-test-minimal.html');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);
  
  console.log('Checking computed styles...');
  const styles = await page.evaluate(() => {
    return {
      htmlBg: getComputedStyle(document.documentElement).backgroundColor,
      bodyBg: getComputedStyle(document.body).backgroundColor,
      htmlBgProperty: document.documentElement.style.background,
      bodyBgProperty: document.body.style.background,
    };
  });
  console.log('Styles:', JSON.stringify(styles, null, 2));
  
  // Export with minimal margin
  await page.pdf({
    path: 'd:/trae/dark-test-minimal.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  console.log('Minimal PDF exported');
  
  // Also try with larger margin
  await page.pdf({
    path: 'd:/trae/dark-test-margin.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
  });
  console.log('PDF with margin exported');
  
  await browser.close();
}

testMinimalDarkPDF().catch(console.error);
