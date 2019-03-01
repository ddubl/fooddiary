// take promise from airtable acccess and search aqua-calc for data, insert into promised object and close promise
import {default as path } from 'path'
import { default as puppeteer } from 'puppeteer';

const sites = {
  aquaCalc: {
    // url: `aqua-calc.com/${page}/${conversion}`,
    url: `aqua-calc.com/calculate/food-volume-to-weight`,
    functions: [
      "food-volume-to-weight",
      "food-weight-to-volume"
    ]
  },
  myFitnessPal: "",
}

export const scraper = {
  *gather(ingredients, scraper) {
    defineRegion = (options) => {
      optionTable = {
        variants: [['id','#'], ['class','$'], ['type']],
        region(func, options = {variants}) {
        }
      }
      input = () => {
        page.document.querySelector(inputVariants())
      }
      // return input and outputRegions as LiveNodeLists

      output = () => {

      }
    }
    // return extracted info from LiveNodeLists
    [...gather.next()].map(())
  }
}

const __dirname = path.dirname(new URL(import.meta.url).pathname);
(async (site, data, skeleton, ...rest) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.${site}`);
  await page.screenshot({path: `${path.resolve(__dirname, '../screenshots/example.png')}`});
  await browser.close();
})(sites.aquaCalc.url);


// ingredients is iterator over ingredients to scrape: can be streamed