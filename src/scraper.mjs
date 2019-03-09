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
/**
 * question is still, how do we invoke a member-function on a return value of an expression in dot-notation.
 * Compliccation: do it without assigning additional variables.
 * solution context 1:
 * what ccomes to mind first is to cheat the assignment of variables and do it with closures and parameters, we lose the concise
 * and the obviously serial invocation of following promise-objects and their resolve() function.
 * 
 * another idea:
 * how does the invocation chain work with IIFE?
 */

// scraper.gather('ananas')

/**
 * other question: what happens to direct assignment of a lambda expression within a promise constructor?
 */

// diff between:
//  we know that the executor is immediately executed upon Promise construcction.
new Promise((resolve, reject) => {
  resolve((value) => { somefunctionbody.operatesOn(value) })
  // executorresolves to the lambda function:
  // return value is void, takes value ?: T | PromiseLike<T>
})

// now we want to resolve this to a thenable. 
new Promise(async (resolve, reject) => {
  await resolve((value) => { somefunctionbody.operatesOn(value) })
  // ATTENTION: Babel resolves functions somehow differently from the v8 engine?! IIFE
  // executorresolves to the lambda function:
  // return value is void, takes value ?: T | PromiseLike<T>
})

// using e lambda expression chains:
x => y => argv[1].someExpression // does that invoke on the variable itself or the returned value?

// Experiments with chained functions:
let fn = x => y => z => console.log(z);
fn('1')('2')('3')
fn()()('3')
console.log(fn())
console.log(fn('1','2','3'))
// what happens if we spread the arguments?
let fn1 = (...x) => (...y) => console.log([...x,...y])
fn1(1, 2)(3, 4)
// what happens if:

console.log('fn2: \b \b ')
let fn2 = x => x => console.log(x)
fn2(1)(2)
fn2(1)()


let ofn = (x) => { return (x = argv) => { return (x = argv) => { return console.log(x) }}}
// following the resolve-chain, what should be possible, is that instead of dot-invoking over the returned value, we invoke the expression with a value? (terminology?)
console.log('ofn:')
ofn(1)

// building to different resolver precedence chains?
new Promise((resolve, reject) => resolve('hi'))
.then(v => console.log(v.hasOwnProperty('then'), 'hoistedpromise'));

// tc39 proposal: ..resolved value property accessor
() => {returnValue[access]}

let someObject = {
  fn1() { return (() => {'fn3 resolved'})},
  fn2() { return 'fn2 resolved' }
}

let o = someObject.fn1()()

x => y => z
function func() {
  let namedFuncExpression = () => {console.log('invoked named fn expression')}
  return () => console.log('hi?')
}

func()();

((() => { return func; })())['namedFuncExpression']()
// ((() => func)())?.namedFuncExpression();

// implementing dispatch-table variations (as library)
