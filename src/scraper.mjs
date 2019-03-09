/**
 * to scraper submodule: automatic scraping needs:
 *    site
 *    seed (extracted form data for one point)
 *    toExtractData
 */

import { default as path } from 'path'
import { default as puppeteer } from 'puppeteer';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const sites = {
  construct(addedString, baseUrl = sites.aquaCalc.baseUrl, superPage = sites.aquaCalc.class, type = sites.aquaCalc.type) {return `https://www.${baseUrl}/${superPage}/${type}${addedString}`},
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

    async function search(item, parameter = sites.aquaCalc.weightToVolume, parentElement = sites.aquaCalc.weightToVolume.lowestCommonParent, ...rest) {
      return await new Promise((async (resolve, reject) => { await page.goto(site); return await resolve(page); }))
        .then(page => page.$(parentElement))
        .then(lowestParent => lowestParent.$(parameter.input)).catch(Error('Element not found'))
        .then(inputElement => inputElement.focus())
        .then(() => page.type(item))
        .then(() => { page.$(parameter.type) })
        .then(() => { page.$(parameter.submit).click(); return page })
        .then(() => page.$('table'))
        .then(() => page.screenshot({path: path.resolve(__dirname, '../screenshots/', 'ananas.png')}))
        .catch(err  => console.error(err));
    }
    return search(ingredients);
  }
}
