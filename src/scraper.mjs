/**
 * to scraper submodule: automatic scraping needs:
 *    site
 *    seed (extracted form data for one point)
 *    toExtractData
 */

import { default as path } from 'path'
import { default as puppeteer } from 'puppeteer';

// constructs: meta-parts of a site and their uses.
// html-table sql
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const sites = {
  construct(addedString, baseUrl = sites.aquaCalc.baseUrl, superPage = sites.aquaCalc.class, type = sites.aquaCalc.weightToVolume.type) {`https://www.${baseUrl}/${superPage}/${type}${addedString}`},
  aquaCalc: {
    class: 'calculate',
    baseUrl: 'aqua-calc.com',
    type: 'food-',
    weightToVolume: {
      partialUrl: 'weight-to-volume',
      lowestCommonParent: '#vwap',
      input: 'input[id=Volume]',
      type: 'select[#Unit]',
      submit: 'input[type=submit, value=Calculate]',
      value: 'table',
    }
  },
  myFitnessPal: {
    urlSnippets: {
      class: '/',
      func: '/' ,
    },
    baseUrl: 'myfitnesspal.com'
  }
}

export const scraper = {
  async gather(ingredients, url = sites, data, ...option) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const partialUrl = url.aquaCalc.weightToVolume.partialUrl;
    const baseUrl = url.aquaCalc.baseUrl;
    const site = url.construct(partialUrl, baseUrl);
    console.log(url['construct']);

    async function search(item, parameter = sites.aquaCalc.weightToVolume, parentElement = sites.aquaCalc.weightToVolume.lowestCommonParent, ...rest) {
      console.log('reached1');
      await page.goto(site);
      let lowestCommonParent = await page.$(parentElement)

      return await lowestCommonParent.$(parameter.input)
        .then(() => console.log('done'))
        .then(inputElement => inputElement.focus())
        .then(focusedElement => focusedElement.type(item))
        .then(() => lowestCommonParent.$(parameter.type))
        .then(() => lowestCommonParent.$(parameter.submit))
        .then(submit => submit.click())
        .then(() => page.$('table'))
        .then(() => page.screenshot(path.resolve(__dirname, '../screenshots/', 'ananas.png')))
        .catch(err  => console.error(err));
    }
    // return extracted info from LiveNodeLists
    return search(ingredients);
  }
}
// (async function scrape(site) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(site)
//   await page.screenshot(path.resolve(__dirname, '../screenshots/anotherExample.png'))
// })(sites.url('weight-to-volume', ))
scraper.gather('ananas');


// ingredients is iterator over ingredients to scrape: can be streamed