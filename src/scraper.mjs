/**
 * to scraper submodule: automatic scraping needs:
 *    site
 *    seed (extracted form data for one point)
 *    toExtractData
 */
import { default as path } from 'path'
import { default as puppeteer } from 'puppeteer';

export const __dirname = path.dirname(new URL(import.meta.url).pathname)
, sites = {
  construct(addedString, baseUrl = sites.aquaCalc.baseUrl, superPage = sites.aquaCalc.class, type = sites.aquaCalc.type) {return `https://www.${baseUrl}/${superPage}/${type}${addedString}`},
  aquaCalc: {
    class: 'calculate',
    baseUrl: 'aqua-calc.com',
    type: 'food-',
    weightToVolume: {
      partialUrl: 'weight-to-volume',
      lowestCommonParent: '#vwap',
      input: 'input[id=search-for-field]',
      type: 'select[#Unit]',
      submit: 'input[type=submit][value=Calculate]',
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
// procedure to extract data from sites.
const procedure = () => {
    gotoSite();
    search();
    constructDataObject();
}

function find(term, scraper) {
  let baseNode = nodeTree ? nodeTree : window.$();

  // x : string, Map => Map(string)
  return x; // whereby x is a functieon resolving to the searchBar, taking a searchTerm as
}


/**
 * @usage function evocation should be done with the closure in mind, meaning that certain tffucntions on promises and in the scraper can ain
 */
async function scraperInit() {
  const browser = await puppeteer.launch()
  , page = await browser.newPage()
  , partialUrl = url.aquaCalc.weightToVolume.partialUrl
  , baseUrl = url.aquaCalc.baseUrl
  , site = url.construct(partialUrl, baseUrl) 
  return browser;
};

async function search(item, parameter, parentElement, ...rest) {
  init();
  return await new Promise((async (resolve, reject) => { await page.goto(site); return await resolve(page); }))
  // abstract over search term/element
    .then(async page => await page.$(parentElement))
    .then(async lowestParent => { await lowestParent; return lowestParent.$(parameter.input) })
    .then(async element => { await element.type(item); await element.press('Enter'); return await element; })
    .catch(err  => console.error(err));
}
