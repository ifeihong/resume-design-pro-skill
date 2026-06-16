const { chromium } = require('playwright');
const path = require('path');

async function testDarkModeEmulation() {
  const htmlPath = path.resolve('d:/trae/dark-test-minimal.html');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);
  
  // Method 1: Emulate dark color scheme
  console.log('Method 1: Emulating dark color scheme...');
  await page.emulateMedia({ media: 'print', colorScheme: 'dark' });
  
  await page.pdf({
    path: 'd:/trae/dark-test-colorscheme.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  console.log('PDF with dark color scheme exported');
  
  // Method 2: Use page.addStyleTag to inject dark styles
  console.log('Method 2: Injecting dark styles...');
  const page2 = await browser.newPage();
  await page2.goto(fileUrl, { waitUntil: 'networkidle' });
  await page2.waitForFunction(() => document.fonts.ready);
  
  await page2.addStyleTag({
    content: `
      html, body, * {
        background-color: #000000 !important;
        background: #000000 !important;
      }
    `
  });
  
  await page2.emulateMedia({ media: 'print' });
  await page2.pdf({
    path: 'd:/trae/dark-test-injected.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  console.log('PDF with injected styles exported');
  
  // Method 3: Take screenshot and check pixels
  console.log('Method 3: Checking actual PDF rendering...');
  const page3 = await browser.newPage();
  await page3.goto(fileUrl, { waitUntil: 'networkidle' });
  await page3.waitForFunction(() => document.fonts.ready);
  await page3.emulateMedia({ media: 'print' });
  
  // Take screenshot of the page as it would be printed
  await page3.screenshot({
    path: 'd:/trae/dark-test-screenshot.png',
    fullPage: true,
    type: 'png'
  });
  console.log('Screenshot taken');
  
  // Check the pixel colors at the corners
  const pixelColors = await page3.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    // This won't work directly, but let's check the body rect
    const body = document.body.getBoundingClientRect();
    return {
      bodyTop: { x: body.top, y: body.left },
      bodyBottom: { x: body.bottom, y: body.left },
      bodyWidth: body.width,
      bodyHeight: body.height,
      htmlBg: getComputedStyle(document.documentElement).backgroundColor,
      bodyBg: getComputedStyle(document.body).backgroundColor,
    };
  });
  console.log('Page info:', JSON.stringify(pixelColors, null, 2));
  
  await browser.close();
  console.log('Done');
}

testDarkModeEmulation().catch(console.error);
