const { chromium } = require('playwright');
const path = require('path');

async function multiPageScreenshot() {
  const htmlPath = path.resolve('d:/trae/resume-zhuhong-signal.html');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);
  
  // Set viewport to full document width, but tall enough for all content
  await page.setViewportSize({ width: 794, height: 3000 });
  
  // Emulate print mode
  await page.emulateMedia({ media: 'print' });
  
  // Get total height after print emulation
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`Total page height: ${totalHeight}px`);
  
  // Full page screenshot
  await page.screenshot({ 
    path: 'd:/trae/print-full.png',
    fullPage: true
  });
  console.log('Full page saved to d:/trae/print-full.png');

  await browser.close();
}

multiPageScreenshot().catch(console.error);
