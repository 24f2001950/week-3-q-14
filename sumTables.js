const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 48; seed <= 57; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log("Visiting:", url);

    await page.goto(url);
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells.map(cell => Number(cell.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} sum:`, sum);

    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();