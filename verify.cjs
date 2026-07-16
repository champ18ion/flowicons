const { chromium } = require('playwright');
const path = require('path');
const { spawn } = require('child_process');

async function runVerification() {
  console.log('Starting preview server...');
  const preview = spawn('npm', ['run', 'preview', '-w', 'playground'], { shell: true });

  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:4173');
  await page.waitForLoadState('networkidle');

  const playgroundButton = page.locator('a[href="/playground"]');
  if (await playgroundButton.count() > 0) {
     console.log('Clicking Open Playground...');
     await playgroundButton.click();
     await page.waitForLoadState('networkidle');
  }

  await page.setViewportSize({ width: 1200, height: 4000 });
  await page.screenshot({ path: 'verification.png', fullPage: true });
  console.log('Screenshot saved to verification.png');

  await browser.close();
  preview.kill();
  console.log('Verification complete');
}

runVerification().catch(console.error);
