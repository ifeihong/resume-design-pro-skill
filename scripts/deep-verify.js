const { chromium } = require('playwright');
const path = require('path');

async function deepVerify() {
  const htmlPath = path.resolve('d:/trae/resume-zhuhong-signal.html');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);
  await page.setViewportSize({ width: 794, height: 1123 });

  // In NORMAL mode, get all computed styles
  const normalStyles = await page.evaluate(() => {
    const results = {};
    const allElements = document.querySelectorAll('body, .container, h1, h2, p, li, span, div, a, .section-title, .exp-role, .summary, .summary-text');
    allElements.forEach((el, i) => {
      if (i > 20) return; // limit
      const style = getComputedStyle(el);
      const tag = el.tagName + (el.className ? '.' + el.className.split(' ')[0] : '');
      results[tag + '_' + i] = {
        color: style.color,
        backgroundColor: style.backgroundColor,
        opacity: style.opacity,
        visibility: style.visibility,
        display: style.display,
      };
    });
    return results;
  });

  console.log('=== NORMAL MODE (first 20 elements) ===');
  console.log(JSON.stringify(normalStyles, null, 2));

  // Switch to PRINT mode
  await page.emulateMedia({ media: 'print' });
  
  const printStyles = await page.evaluate(() => {
    const results = {};
    const allElements = document.querySelectorAll('body, .container, h1, h2, p, li, span, div, a, .section-title, .exp-role, .summary, .summary-text');
    allElements.forEach((el, i) => {
      if (i > 20) return;
      const style = getComputedStyle(el);
      const tag = el.tagName + (el.className ? '.' + el.className.split(' ')[0] : '');
      results[tag + '_' + i] = {
        color: style.color,
        backgroundColor: style.backgroundColor,
        opacity: style.opacity,
        visibility: style.visibility,
        display: style.display,
      };
    });
    return results;
  });

  console.log('\n=== PRINT MODE (first 20 elements) ===');
  console.log(JSON.stringify(printStyles, null, 2));

  // Take screenshot in print mode
  await page.screenshot({ 
    path: 'd:/trae/signal-print-detailed.png',
    clip: { x: 0, y: 0, width: 794, height: 600 }
  });
  console.log('\nDetailed print screenshot saved: d:/trae/signal-print-detailed.png');

  await browser.close();
}

deepVerify().catch(console.error);
