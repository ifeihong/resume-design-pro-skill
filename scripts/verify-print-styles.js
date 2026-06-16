const { chromium } = require('playwright');
const path = require('path');

async function verifyPDF() {
  const htmlPath = path.resolve('d:/trae/resume-zhuhong-signal.html');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);
  await page.setViewportSize({ width: 794, height: 1123 });

  // Check computed styles in normal mode
  const styles = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const body = getComputedStyle(document.body);
    const container = document.querySelector('.container');
    const cs = container ? getComputedStyle(container) : null;
    const h1 = document.querySelector('h1');
    const hs = h1 ? getComputedStyle(h1) : null;
    const firstLi = document.querySelector('li');
    const ls = firstLi ? getComputedStyle(firstLi) : null;
    const sectionTitle = document.querySelector('.section-title');
    const sts = sectionTitle ? getComputedStyle(sectionTitle) : null;
    
    return {
      bodyBg: body.backgroundColor,
      bodyColor: body.color,
      containerBg: cs ? cs.backgroundColor : 'no container',
      containerColor: cs ? cs.color : 'no container',
      h1Color: hs ? hs.color : 'no h1',
      liColor: ls ? ls.color : 'no li',
      sectionTitleColor: sts ? sts.color : 'no section-title',
      cssVarBg: root.getPropertyValue('--color-bg').trim(),
      cssVarText: root.getPropertyValue('--color-text').trim(),
      cssVarSurface: root.getPropertyValue('--color-surface').trim(),
      cssVarMuted: root.getPropertyValue('--color-text-muted').trim(),
    };
  });

  console.log('=== Normal (Screen) Mode ===');
  console.log(JSON.stringify(styles, null, 2));

  // Check print mode
  await page.emulateMedia({ media: 'print' });
  const printStyles = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const body = getComputedStyle(document.body);
    const container = document.querySelector('.container');
    const cs = container ? getComputedStyle(container) : null;
    const h1 = document.querySelector('h1');
    const hs = h1 ? getComputedStyle(h1) : null;
    const firstLi = document.querySelector('li');
    const ls = firstLi ? getComputedStyle(firstLi) : null;
    const sectionTitle = document.querySelector('.section-title');
    const sts = sectionTitle ? getComputedStyle(sectionTitle) : null;
    
    return {
      bodyBg: body.backgroundColor,
      bodyColor: body.color,
      containerBg: cs ? cs.backgroundColor : 'no container',
      containerColor: cs ? cs.color : 'no container',
      h1Color: hs ? hs.color : 'no h1',
      liColor: ls ? ls.color : 'no li',
      sectionTitleColor: sts ? sts.color : 'no section-title',
    };
  });

  console.log('\n=== Print Mode (emulateMedia) ===');
  console.log(JSON.stringify(printStyles, null, 2));

  // Export test PDF
  await page.pdf({
    path: 'd:/trae/test-signal-verify.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  console.log('\nTest PDF saved to d:/trae/test-signal-verify.pdf');
  await browser.close();
}

verifyPDF().catch(console.error);
