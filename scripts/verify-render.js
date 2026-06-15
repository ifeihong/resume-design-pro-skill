const { chromium } = require('playwright');
const fs = require('fs');

async function verify() {
  // 1. Screenshot the HTML to verify rendering
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const fileUrl = 'file:///' + 'd:\\trae\\resume-zhuhong-signal.html'.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);
  await page.setViewportSize({ width: 794, height: 1123 });
  
  // Wait for animations to complete
  await page.waitForTimeout(2000);
  
  await page.screenshot({ 
    path: 'd:\\trae\\resume-zhuhong-signal-preview.png', 
    fullPage: true 
  });
  console.log('Screenshot saved: d:\\trae\\resume-zhuhong-signal-preview.png');
  
  // 2. Check computed styles for key elements
  const styles = await page.evaluate(() => {
    const body = document.body;
    const container = document.querySelector('.container');
    const name = document.querySelector('.name');
    const summary = document.querySelector('.summary-text');
    
    return {
      bodyBg: window.getComputedStyle(body).backgroundColor,
      bodyColor: window.getComputedStyle(body).color,
      containerBg: window.getComputedStyle(container).backgroundColor,
      nameColor: window.getComputedStyle(name).color,
      summaryColor: window.getComputedStyle(summary).color,
    };
  });
  
  console.log('\n--- Computed Styles ---');
  console.log('Body background:', styles.bodyBg);
  console.log('Body text color:', styles.bodyColor);
  console.log('Container background:', styles.containerBg);
  console.log('Name color:', styles.nameColor);
  console.log('Summary color:', styles.summaryColor);
  
  await browser.close();
}

verify().catch(console.error);
