const puppeteer = require('puppeteer');
const tinyurl = require('tinyurl-api');

class YoutubeScraper {
  static async scrape(urls) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.y2mate.com/youtube/' + urls);

    await page.waitForSelector('.table-bordered tbody');

    const index = 1;
    await page.evaluate((index) => {
      const tr = document.querySelectorAll('.table-bordered tbody tr')[index];
      const td3 = tr.querySelector('td:nth-child(3) > button');
      td3.click();
    }, index);

    await page.waitForSelector('#process-result .btn-file[href]');
    const href = await page.$eval('#process-result .btn-file[href]', link => link.href);

    const td1 = await page.$eval(`.table-bordered tbody tr:nth-child(${index + 1}) td:nth-child(1)`, el => el.innerText);
    const td2 = await page.$eval(`.table-bordered tbody tr:nth-child(${index + 1}) td:nth-child(2)`, el => el.innerText);
    const url = await tinyurl(href);

    let data = {
      quality: td1,
      size: td2,
      link : {
        long: href,
        short: url
      }
    };

    await browser.close();
    return data;
  }
}

module.exports = YoutubeScraper;


// const urls = 'https://ytmp3.cc/en13/';
// YoutubeScraper.scrape(urls)
//   .then(data => console.log(data))
//   .catch(err => console.error(err));