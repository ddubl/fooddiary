import { fs, __dirname, memoize, isEmpty } from './utils.mjs'
import { base } from './airtableAccess.mjs'

/**
 * @param a {Object} : name, e, p, c, f, d
 */
export async function* Ingredients(...parameters) {
// all inherited Ingredients => Singletons
  let Ingredient = (...params) => x => {
    let map =
      { array = p => (Ingredient(p.shift()))
      , string = p => ({name: p})
      , object = ({name, p, c, f, k, d}) => ({name, p, c, f, k, d})
      , undefined = p => TypeErr(p)
      }
    return params.reduce(p => map[typeof(p)](params), x)
  }

  yield Ingredient(parameters).map(
    v => Object.assign(
      { Name: name
      , p
      , c
      , f
      , k
      , d
      } = v
    )
  )
}

/**
 * @async
 * @function gather
 * @signature (s, o) -> P(I(o))
 * @usage filter for points with existing recipe
 * @param {String} baseName - base title
 * @param {<Filter>} filter - type=object airtableAPI handled filtering of data
 * @returns {?Array.<Ingredient>}
 */
// separate gather-function with bases
  // filter function that evaluates to filter object.
  // basically factory function?
let filter = () => {

}

export async function gather(baseName, filter) {
  return await base(baseName).select(filter).eachPage(
    function page(records) {
      (record => Ingredients(record))(records.fields)
    }
  )
  .catch(err => Error(err))
}

export async function toFile(data)
