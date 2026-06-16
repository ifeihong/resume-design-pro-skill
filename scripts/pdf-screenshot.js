const { chromium } = require('playwright');
const path = require('path');

async function screenshotPDF() {
  const pdfPath = path.resolve('d:/trae/resume-zhuhong-signal-v2.pdf');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('file:///' + pdfPath.replace(/\\/g, '/'), { waitUntil: 'networkidle' });
  await page.setViewportSize({ width: 794, height: 1123 });

  // Take screenshots of each page
  const pages = await page.locator('canvas, img, .page').count();
  console.log(`PDF has ${pages} pages`);

  // Screenshot first page
  await page.screenshot({ 
    path: 'd:/trae/pdf-page1.png',
    clip: { x: 0, y: 0, width: 794, height: 1123 }
  });
  console.log('Page 1 screenshot saved');

  // Screenshot second page
  await page.screenshot({ 
    path: 'd:/trae/pdf-page2.png',
    clip: { x: 0, y: 1123, width: 794, height: 1123 }
  });
  console.log('Page 2 screenshot saved');

  // Screenshot third page
  await page.screenshot({ 
    path: 'd:/trae/pdf-page3.png',
    clip: { x: 0, y: 2246, width: 794, height: 1123 }
  });
  console.log('Page 3 screenshot saved');

  await browser.close();
}

screenshotPDF().catch(console.error);
