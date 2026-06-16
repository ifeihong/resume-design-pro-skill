/**
 * Verify PDF print styles: opacity, footer display, body background
 * Usage: node verify-pdf-print.js <input-html-file>
 */
const { chromium } = require('playwright');
const path = require('path');

async function verify(htmlFile) {
  const inputPath = path.resolve(htmlFile);
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const fileUrl = 'file:///' + inputPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);

  // Emulate print media
  await page.emulateMedia({ media: 'print' });

  const results = await page.evaluate(() => {
    const checks = {};

    // 1. Check text opacity - sample multiple elements
    const allElements = document.querySelectorAll('body *');
    let lowOpacityCount = 0;
    let totalChecked = 0;
    const lowOpacityElements = [];

    allElements.forEach(el => {
      const style = window.getComputedStyle(el);
      totalChecked++;
      const opacity = parseFloat(style.opacity);
      if (opacity < 1) {
        lowOpacityCount++;
        if (lowOpacityElements.length < 5) {
          lowOpacityElements.push({
            tag: el.tagName,
            class: el.className.substring(0, 60),
            opacity
          });
        }
      }
    });
    checks.opacity = {
      totalChecked,
      lowOpacityCount,
      lowOpacityElements,
      passed: lowOpacityCount === 0
    };

    // 2. Check footer display
    const footerSelectors = ['.resume-footer', '.footer-text', '.footer'];
    const footerResults = {};
    footerSelectors.forEach(sel => {
      const els = document.querySelectorAll(sel);
      const details = [];
      els.forEach(el => {
        const style = window.getComputedStyle(el);
        details.push({
          display: style.display,
          visibility: style.visibility,
          opacity: style.opacity
        });
      });
      footerResults[sel] = { count: els.length, details };
    });
    checks.footer = footerResults;

    // 3. Check body background vs container background
    const bodyStyle = window.getComputedStyle(document.body);
    const container = document.querySelector('.container') || document.querySelector('.resume-container');
    const containerStyle = container ? window.getComputedStyle(container) : null;

    checks.background = {
      body: {
        backgroundColor: bodyStyle.backgroundColor,
        background: bodyStyle.background.substring(0, 80)
      },
      container: containerStyle ? {
        backgroundColor: containerStyle.backgroundColor,
        background: containerStyle.background.substring(0, 80)
      } : null
    };

    // 4. Check body min-height
    checks.bodyMinHeight = {
      minHeight: bodyStyle.minHeight,
      passed: bodyStyle.minHeight === 'auto' || bodyStyle.minHeight === '0px'
    };

    return checks;
  });

  console.log('\n========== Verification Results ==========');
  console.log(`File: ${path.basename(htmlFile)}\n`);

  // Opacity check
  console.log('[1] Text Opacity Check:');
  console.log(`    Elements checked: ${results.opacity.totalChecked}`);
  console.log(`    Elements with opacity < 1: ${results.opacity.lowOpacityCount}`);
  if (results.opacity.lowOpacityCount > 0) {
    console.log('    Low opacity elements:');
    results.opacity.lowOpacityElements.forEach(el => {
      console.log(`      <${el.tag}> class="${el.class}" opacity=${el.opacity}`);
    });
  }
  console.log(`    Result: ${results.opacity.passed ? 'PASS' : 'FAIL'}\n`);

  // Footer check
  console.log('[2] Footer Display Check:');
  let footerPass = true;
  for (const [sel, info] of Object.entries(results.footer)) {
    console.log(`    Selector "${sel}": ${info.count} element(s)`);
    info.details.forEach((d, i) => {
      const isHidden = d.display === 'none';
      if (!isHidden) footerPass = false;
      console.log(`      [${i}] display=${d.display}, visibility=${d.visibility}, opacity=${d.opacity} -> ${isHidden ? 'HIDDEN' : 'VISIBLE'}`);
    });
  }
  console.log(`    Result: ${footerPass ? 'PASS' : 'FAIL'}\n`);

  // Background check
  console.log('[3] Body Background Check:');
  console.log(`    Body background-color: ${results.background.body.backgroundColor}`);
  if (results.background.container) {
    console.log(`    Container background-color: ${results.background.container.backgroundColor}`);
  } else {
    console.log('    Container: not found');
  }
  console.log(`    Body min-height: ${results.bodyMinHeight.minHeight} -> ${results.bodyMinHeight.passed ? 'PASS' : 'FAIL'}\n`);

  // Summary
  const allPass = results.opacity.passed && footerPass && results.bodyMinHeight.passed;
  console.log('========================================');
  console.log(`Overall: ${allPass ? 'ALL CHECKS PASSED' : 'SOME CHECKS FAILED'}`);
  console.log('========================================\n');

  await browser.close();
  return allPass;
}

const file = process.argv[2];
if (!file) {
  console.error('Usage: node verify-pdf-print.js <html-file>');
  process.exit(1);
}
verify(file).then(ok => process.exit(ok ? 0 : 1));
