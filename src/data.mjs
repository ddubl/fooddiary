import { default as fsWithCallbacks } from 'fs'
import { default as path } from 'path'
import { memoize, isEmpty } from './utils.mjs'
import { base } from './airtableAccess.mjs'

const fs = fsWithCallbacks.promises;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function ingredientSkeleton() {
  const skeletonShape = 'scrapeData.json';
  const skeletonPath = path.resolve(__dirname, `../data/${skeletonShape}`);
  const skeletonBuffer = await fs.readFile(skeletonPath);

  const skeleton = new Promise((resolve, reject) => {
    () => { JSON.parse(skeletonBuffer.toString()) resolve()
  })
  return skeleton;
}

export async function* Ingredients(base = base) {
  let ingredient = new Promise((resolve, reject) => {
    resolve({});
  });

  async function* gather(baseName, filter) {
    //filtering airtabledata for points with recipe non-null is in filter object -> handled by airtableAPI
    base(baseName).select(filter).eachPage(
      async function page(records) {
        records.forEach(record => {
          yield await filter.fields.map(
            value => !isEmpty(record.get(value)) && value !== 'Name'
              ? ingredient[`${value}`] = record.get(value)
              : ingredient.hasOwnProperty(`${value}`)
              ? delete ingredient[`${value}`]
              : value
          );
        })
      }
    )
  }

  yield* await gather('ingredients', base.ingredients.filter);
}

console.log(Ingredients(base));
