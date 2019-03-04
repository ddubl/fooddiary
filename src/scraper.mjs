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
const sites = {
  construct: (addedString, baseUrl, superPage = aquaCalc.class, type = aquaCalc.type) =>  {`${baseUrl}/${superPage}/${type}${addedString}`},
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
  async *gather(url = sites, data, ...option) {
    //check valid url
    const partialUrl = url.aquaCalc.weightToVolume.partialUrl;
    const baseUrl = url.aquaCalc.baseUrl;
    const site = url.construct(partialUrl, baseUrl);
    const page = await option['page'] || await Function.call(puppeteer.launch(), newPage);

    defineRegion = (options) => {
      optionTable = {
        variants: [['id','#'], ['class','$'], ['type']],
        get() {
          return region()
        },
        region(func, options = {variants}) {

        }
      }

      input = async (item, parameter, parentElement, ...rest = sites) => {
        let lowestCommonParent = parentElement || rest.aquaCalc.weightToVolume.lowestCommonParent;
        let params = rest.aquaCalc.weightToVolume;

        await lowestCommonParent.$(params.input)
      }
      // return input and outputRegions as LiveNodeLists

      output = async () => {

      }
    }
    // return extracted info from LiveNodeLists
    yield* [...gather(sites, ingredients)].map((value) => {

    })
  }
}

const __dirname = path.dirname(new URL(import.meta.url).pathname);
(async (site, ...rest) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.${site}`);
  const inputElement = await page.$$('input');
  await console.log(inputElement);
  await browser.close();
})(sites.aquaCalc.baseUrl);


// ingredients is iterator over ingredients to scrape: can be streamed