import { default as fsWithCallbacks } from 'fs'
import { default as path } from 'path'
import { memoize, isEmpty } from './utils.mjs'
import { base } from './airtableAccess.mjs'

const fs = fsWithCallbacks.promises
, __dirname = path.dirname(new URL(import.meta.url).pathname)

/**
 * @param a {Object} : name, e, p, c, f, d
 */
// @Factory
async function Ingredient(...a) {

  // all inherited object from Ingredient are unique (ergo singletons)
  const {name, rest} = a
  , skeletonShape = 'scrapeData.json'
  , skeletonPath = path.resolve(__dirname, `../data/${skeletonShape}`)

  let Ingredient = await fs.readFile(skeletonPath)
    .then(
      v => JSON.parse(v.toString())
    ).catch(
      err => Error(err, 'returning most primitive state: {}'), {}
    )

  // TODO: memoization currently always returns new object, even if same name and other params are different
  return memoize(
    Object.assign(Object.create(Ingredient, name), 
      { Name: name,
        ...rest
      }
    )
  )
}

/** 
 * @signature (s, o) -> P(I(o))
 * @usage filter for points with existing recipe
 * @param baseName indicating baseName Value
 * @param filter type=object airtableAPI handled filtering of data
 * @returns [Ingredient] 
 */
export async function gather(baseName, filter) {

  base(baseName).select(filter).eachPage(
    function page(records) {
      records.forEach(record => filter.fields.map(
        Ingredient(
        value => !isEmpty(record.get(value)) && value !== 'Name'
          ? ingredient[`${value}`] = record.get(value)
          : ingredient.hasOwnProperty(`${value}`)
          ? delete ingredient[`${value}`]
          : value
        )
      )
    }
  )

  return ingredient;
}
