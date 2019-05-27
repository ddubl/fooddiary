/**
 * to scraper submodule: automatic scraping needs:
 *    site
 *    seed (extracted form data for one point)
 *    toExtractData
 */

 /**
  * @typedef {import('puppeteer').page} Page
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
  let searchHandler = field => { 
    // check elementhandle -> goto ParentElement -> 1)
    field.hasOwnProperty('form')
  }

  /**
   * pressing enter with current field selected prompts form send or appropriate functionality.
   * @param field 
   */
  let enterable = field => {
  // surroundings should ideally only check upwardly-cascading elements for attached handlers
    return v => (field => searchHandler(field) || TypeError('parameter isn\'t a &Elementhandle'))
  }

  /**
   * 
   * @param page 
   */
  const field = async (page) => {
    // serving as core to ml
    let surface = {
      // properties: case-insensitive
      topical: {
        surroundingThemes: names
      },
      'aria-label': 'Search',
      names: {
      },
      commons: {
        contains: {
          term: /search/,
          in: [
            id,
            type,
            actions,
            'aria-label'
          ]
        }
      },
      prerequisites: {
        input: text,
        enterable: true
      }
    }
    // destructure surface according to dispatchFunction
    // what does a HTMLNode look like?
  }
}

/**
 * @usage function evocation should be done with the closure in mind, meaning that certain tffucntions on promises and in the scraper can ain
 * @usage not needed initializer?
 * @dispatch[{object}, {NodeList: ElementHandle}]
 */
export async function browse(site) {

  return await puppeteer.launch()
  .then(async v => await v.newPage())
  .then(async v => await v.goto(site))
  .catch(err => Error(err));
};

// @dispatch(selector, field(search, result))
/**
 * @type {Object} Page
 * @param {NodeList | } page 
 * @param param1 
 */
export async function select(page, {field}) {
  const Selector = (...field) => x => {
    let dispatch = {
      [Symbol.for('Dispatcher')]: true,
      search(page) {
        return field.surface = page
      },
      result(nodeList) {}
    }
    return field.reduce(t => dispatch[typeof(t)](field), x)
  }
  return Selector(field) ? page.$(field) : ReferenceError(`${field} is not defined`)
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

export async function dispatcher(obj) {
  
}