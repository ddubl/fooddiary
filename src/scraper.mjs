/**
 * to scraper submodule: automatic scraping needs:
 *    site
 *    seed (extracted form data for one point)
*    toExtractData
 * @typedef {NodeList}
 */

import { __dirname } from './utils.mjs'
import { default as path } from 'path'
import { default as puppeteer } from 'puppeteer';

/**
 * 
 * @param elementHandle instanceOf ElementHandle
 * @param page
 */
let fieldFactory = (page, elementHandle) => {
  /**
   * @param {(Array.<NodeList>|Array.<LiveNodeList>|Array.<ElementHandle>)} field
   * @return {PromiseLike<Object>}
   */

  //@enterable
  let searchHandler = field => { 
    // check elementhandle -> goto ParentElement -> 1)
    field.hasOwnProperty('form')
  }

  let enterable = field => {
  // surroundings should ideally only check upwardly-cascading elements for attached handlers
    return (field => searchHandler(field) || TypeError('parameter isn\'t a &Elementhandle'))
  }

  const field = async (page) => {
    // serving as core to ml
    let surface = {
      topical: {
        surroundingThemes: names
      },
      names: {
      },
      commons: {
        contains: {
          term: /search/,
          in: {
            id,
            type,
            actions,
          }
        }
      },
      prerequisites: {
        input: text,
        enterable: true
      }
    }
    // destructure surface according to dispatchFunction


  }
}

/**
 * @usage function evocation should be done with the closure in mind, meaning that certain tffucntions on promises and in the scraper can ain
 * @usage not needed initializer?
 */
// @dispatch[{object}, {NodeList: ElementHandle}]
export async function browse({field}) {

  return await puppeteer.launch()
  .then(async v => await v.newPage())
  .then(async v => await v.goto(site))
  .catch(err => Error(err));
};

// @dispatch(selector, field(search, result))
async function select(page, {type}) {
  const selector = {
    search(type = type) {  
      getField(page)
    },
    result() {

    }
  }

  return selector[type] ? page.$(type) : ReferenceError(`${type} is not defined`)
}

export async function search(site, item, parameter, ...rest) {
  fields = fields || field(site);

  return await site
    .then(async page => await select(page, search))
    .then(async lowestParent => { return await lowestParent.$(parameter.input) })
    .then(async element => { await element.type(item); await element.press('Enter'); return await element; })
    .catch(err => Error(err));
};

export async function testSite(site) {
  return await site.screenshot()
}
