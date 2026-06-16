const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const pdfPath = path.resolve('d:\\trae\\test-resume-10-dark-oled-v3.pdf');
  const screenshotPath = path.resolve('d:\\trae\\test-resume-10-dark-oled-v3-preview.png');
  const htmlPath = path.resolve('d:\\trae\\test-resume-10-dark-oled.html');

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // 直接加载原始 HTML 文件，模拟打印预览模式
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);

  // 模拟打印媒体查询
  await page.emulateMedia({ media: 'print' });

  // 设置视口为 A4 尺寸
  await page.setViewportSize({ width: 794, height: 1123 });

  // 等待渲染
  await page.waitForTimeout(1000);

  // 获取 body 的计算背景色
  const bgColor = await page.evaluate(() => {
    const el = document.body;
    if (!el) return null;
    const style = window.getComputedStyle(el);
    return {
      backgroundColor: style.backgroundColor,
      background: style.background
    };
  });
  console.log('Body computed background (print mode):', JSON.stringify(bgColor, null, 2));

  // 截图查看效果
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Screenshot saved to:', screenshotPath);

  await browser.close();
})();
