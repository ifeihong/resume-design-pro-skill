const { chromium } = require('playwright');
const path = require('path');

async function testWithArgs() {
  const htmlPath = path.resolve('d:/trae/dark-test-minimal.html');
  
  // Try with additional Chromium args
  console.log('Method 1: Default launch...');
  let browser = await chromium.launch();
  let page = await browser.newPage();
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'));
  await page.waitForFunction(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: 'd:/trae/dark-test-method1.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await browser.close();
  console.log('Method 1 done');
  
  // Method 2: With args
  console.log('Method 2: With custom args...');
  browser = await chromium.launch({
    args: [
      '--print-background',
      '--no-pdf-header-footer',
      '--disable-web-security'
    ]
  });
  page = await browser.newPage();
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'));
  await page.waitForFunction(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: 'd:/trae/dark-test-method2.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await browser.close();
  console.log('Method 2 done');
  
  // Method 3: Using screenshot comparison
  console.log('Method 3: Comparing screenshot vs PDF...');
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'));
  await page.waitForFunction(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  
  // Take screenshot first
  await page.screenshot({
    path: 'd:/trae/dark-test-screen.png',
    fullPage: true,
    type: 'png'
  });
  
  // Then PDF
  await page.pdf({
    path: 'd:/trae/dark-test-method3.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await browser.close();
  console.log('Method 3 done. Screenshot and PDF both created.');
  console.log('Compare dark-test-screen.png with dark-test-method3.pdf');
}

testWithArgs().catch(console.error);
