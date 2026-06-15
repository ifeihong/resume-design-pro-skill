const { chromium } = require('playwright');

async function verifyPDF() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Open the PDF file in browser
  const pdfUrl = 'file:///' + 'd:\\trae\\resume-zhuhong-signal.pdf'.replace(/\\/g, '/');
  await page.goto(pdfUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  await page.setViewportSize({ width: 794, height: 1123 });
  
  // Screenshot the first page
  await page.screenshot({ 
    path: 'd:\\trae\\resume-zhuhong-signal-pdf-verify.png',
    fullPage: false
  });
  console.log('PDF screenshot saved: d:\\trae\\resume-zhuhong-signal-pdf-verify.png');
  
  await browser.close();
}

verifyPDF().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
