const { chromium } = require('playwright');
const path = require('path');

async function testPDFRealOutput() {
  const htmlPath = path.resolve('d:/trae/test-resume-10-dark-oled.html');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);
  await page.setViewportSize({ width: 794, height: 1123 });

  // Emulate print mode
  await page.emulateMedia({ media: 'print' });

  // Check what the actual page looks like in print mode
  const pageInfo = await page.evaluate(() => {
    return {
      htmlBg: getComputedStyle(document.documentElement).backgroundColor,
      bodyBg: getComputedStyle(document.body).backgroundColor,
      bodyMargin: getComputedStyle(document.body).margin,
      bodyPadding: getComputedStyle(document.body).padding,
      htmlWidth: document.documentElement.offsetWidth,
      htmlHeight: document.documentElement.scrollHeight,
      bodyWidth: document.body.offsetWidth,
      bodyHeight: document.body.scrollHeight,
    };
  });
  console.log('Page info in print mode:', JSON.stringify(pageInfo, null, 2));

  // Take a screenshot showing the actual page content
  await page.screenshot({ 
    path: 'd:/trae/print-mode-page.png',
    fullPage: true
  });
  console.log('Screenshot saved');

  // Now check what PDF itself looks like
  // The PDF might look different when opened in a PDF viewer
  
  await browser.close();
}

testPDFRealOutput().catch(console.error);
