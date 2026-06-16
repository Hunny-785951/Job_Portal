const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const delay = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    defaultViewport: { width: 1280, height: 800 }
  });
  
  const page = await browser.newPage();
  
  const screenshotsDir = path.join(__dirname, 'public', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // Clear any existing localStorage
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.clear());

  console.log('Registering Candidate...');
  await page.goto('http://localhost:3000/register', { waitUntil: 'networkidle0' });
  await delay(1000);
  await page.type('input[type="text"]', 'John Candidate');
  await page.type('input[type="email"]', 'candidate2@example.com');
  await page.type('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  await delay(1000); // Wait for redirect to home
  console.log('Navigating to Candidate Dashboard...');
  await page.goto('http://localhost:3000/user/dashboard', { waitUntil: 'networkidle0' });
  await delay(2000);
  await page.screenshot({ path: path.join(screenshotsDir, 'candidate_dashboard.png') });
  
  // Clear local storage and logout
  await page.evaluate(() => localStorage.clear());
  
  console.log('Registering Employer...');
  await page.goto('http://localhost:3000/register', { waitUntil: 'networkidle0' });
  await delay(1000);
  
  // Click employer radio
  await page.evaluate(() => {
    const radios = document.querySelectorAll('input[type="radio"]');
    for (let r of radios) {
      if (r.value === 'employer') {
        r.click();
      }
    }
  });
  await delay(500);
  await page.type('input[type="text"]', 'Jane Employer');
  await page.type('input[type="email"]', 'employer2@example.com');
  await page.type('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  await delay(1000); // Wait for redirect to home
  console.log('Navigating to Employer Dashboard...');
  await page.goto('http://localhost:3000/employer/dashboard', { waitUntil: 'networkidle0' });
  await delay(2000);
  await page.screenshot({ path: path.join(screenshotsDir, 'employer_dashboard.png') });
  
  await browser.close();
  console.log('Done!');
})();
