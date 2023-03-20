const puppeteer = require('puppeteer');
const TinyURL = require('shefin-tinyurl');

class YoutubeScraper {
  static async scrape(urls) {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process", // <- this one doesn't works in Windows
        "--disable-gpu",
      ],
      executablePath: '/usr/bin/google-chrome-stable',
    });
    const page = await browser.newPage();
    await page.goto('https://www.y2mate.com/youtube/' + urls);

    await page.waitForSelector('.table-bordered tbody');

    const index = 2;
    await page.evaluate((index) => {
      const tr = document.querySelectorAll('.table-bordered tbody tr')[index];
      const td3 = tr.querySelector('td:nth-child(3) > button');
      td3.click();
    }, index);

    await page.waitForSelector('#process-result .btn-file[href]');
    const href = await page.$eval('#process-result .btn-file[href]', link => link.href);

    const title = await page.$eval(`.thumbnail .caption`, el => el.innerText);
    const thumbnail = await page.$eval(`.thumbnail img`, el => el.getAttribute('src'));

    const td1 = await page.$eval(`.table-bordered tbody tr:nth-child(${index + 1}) td:nth-child(1)`, el => el.innerText);
    const td2 = await page.$eval(`.table-bordered tbody tr:nth-child(${index + 1}) td:nth-child(2)`, el => el.innerText);

    const tinyU = async (url) => {
      let response = await TinyURL.shorten(url);
      return response
    }

    const url = await tinyU(href)

    let data = {
      title: title,
      thumbnail: thumbnail,
      quality: td1,
      size: td2,
      link: {
        short: url,
        long: href,
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