const { chromium } = require('playwright');
const path = require('path');

async function screenshotCompare() {
  const htmlPath = path.resolve('d:/trae/resume-zhuhong-signal.html');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);
  await page.setViewportSize({ width: 794, height: 1123 });

  // Screenshot 1: Normal mode (first page)
  await page.screenshot({ 
    path: 'd:/trae/signal-screen-page1.png',
    clip: { x: 0, y: 0, width: 794, height: 1123 }
  });
  console.log('Screen screenshot saved: d:/trae/signal-screen-page1.png');

  // Screenshot 2: Print mode emulation
  await page.emulateMedia({ media: 'print' });
  await page.screenshot({ 
    path: 'd:/trae/signal-print-page1.png',
    clip: { x: 0, y: 0, width: 794, height: 1123 }
  });
  console.log('Print emulation screenshot saved: d:/trae/signal-print-page1.png');

  await browser.close();
}

screenshotCompare().catch(console.error);
