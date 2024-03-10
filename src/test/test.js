const { Builder, By } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:3009/quotation');
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    const quotation = JSON.parse(bodyText);
    console.log(quotation);
  } finally {
    await driver.quit();
  }
})();
