const { chromium } = require('playwright');
const path = require('path');

async function validatePDF(htmlFile, label) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const fileUrl = 'file:///' + htmlFile.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);

  // Check 1: Text opacity (all visible text should have opacity > 0)
  const opacityResult = await page.evaluate(() => {
    const allElements = document.querySelectorAll('body *');
    let invisibleCount = 0;
    let invisibleElements = [];
    for (const el of allElements) {
      if (el.children.length === 0 || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'P' || el.tagName === 'LI' || el.tagName === 'SPAN' || el.tagName === 'DIV') {
        const style = window.getComputedStyle(el);
        const opacity = parseFloat(style.opacity);
        if (opacity < 0.1 && el.textContent.trim().length > 0) {
          invisibleCount++;
          if (invisibleElements.length < 5) {
            invisibleElements.push(el.tagName + '.' + el.className.split(' ')[0] + ': "' + el.textContent.trim().substring(0, 30) + '"');
          }
        }
      }
    }
    return { invisibleCount, invisibleElements };
  });

  // Check 2: Large blank areas (min-height issues)
  const blankAreaResult = await page.evaluate(() => {
    const container = document.querySelector('.container');
    if (!container) return { containerHeight: 0, contentHeight: 0, ratio: 0 };
    const containerHeight = container.scrollHeight;
    const contentHeight = container.clientHeight;
    const ratio = contentHeight / containerHeight;
    return { containerHeight, contentHeight, ratio };
  });

  // Check 3: Body background color
  const bodyBgResult = await page.evaluate(() => {
    const style = window.getComputedStyle(document.body);
    return {
      backgroundColor: style.backgroundColor,
      minHeight: style.minHeight
    };
  });

  // Check 4: Footer visibility
  const footerResult = await page.evaluate(() => {
    const footer = document.querySelector('.resume-footer');
    if (!footer) return { exists: false };
    const style = window.getComputedStyle(footer);
    return {
      exists: true,
      display: style.display,
      visibility: style.visibility,
      text: footer.textContent.trim().substring(0, 50)
    };
  });

  // Check 5: Verify content is filled (no placeholders remaining)
  const placeholderResult = await page.evaluate(() => {
    const bodyText = document.body.innerHTML;
    const placeholders = bodyText.match(/\{\{[A-Z_]+\}\}/g);
    return {
      hasPlaceholders: placeholders !== null,
      placeholderCount: placeholders ? placeholders.length : 0,
      placeholders: placeholders ? placeholders.slice(0, 10) : []
    };
  });

  await browser.close();

  console.log(`\n========== ${label} Validation ==========`);
  console.log(`[1] Text Opacity: ${opacityResult.invisibleCount === 0 ? 'PASS' : 'WARNING'} (${opacityResult.invisibleCount} invisible elements)`);
  if (opacityResult.invisibleElements.length > 0) {
    opacityResult.invisibleElements.forEach(e => console.log(`    - ${e}`));
  }
  console.log(`[2] Blank Areas: ${blankAreaResult.ratio > 0.5 ? 'PASS' : 'WARNING'} (content/container ratio: ${blankAreaResult.ratio.toFixed(2)})`);
  console.log(`[3] Body Background: ${bodyBgResult.backgroundColor}`);
  console.log(`[4] Footer: ${footerResult.exists ? footerResult.display + ' / ' + footerResult.visibility : 'NOT FOUND'}`);
  console.log(`[5] Placeholders: ${placeholderResult.hasPlaceholders ? 'FAIL - ' + placeholderResult.placeholderCount + ' remaining' : 'PASS - All replaced'}`);
  if (placeholderResult.placeholders.length > 0) {
    placeholderResult.placeholders.forEach(p => console.log(`    - ${p}`));
  }
  console.log(`===========================================\n`);
}

(async () => {
  try {
    await validatePDF('d:\\trae\\test-resume-01-minimalism.html', 'Minimalism');
    await validatePDF('d:\\trae\\test-resume-10-dark-oled.html', 'Dark OLED');
    await validatePDF('d:\\trae\\test-resume-20-signal.html', 'Signal');
    console.log('All validations completed.');
  } catch (err) {
    console.error('Validation error:', err.message);
    process.exit(1);
  }
})();
