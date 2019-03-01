import { scraper } from './scraper.mjs'
import { buildSkeleton, Ingredient } from './data.mjs'
import { default as fsWithCallbacks} from 'fs'
import { base } from './airtableAccess.mjs'
const fs = fsWithCallbacks.promises;

ingredientList(airtableGet)
  .then(ingredientList => scrapeFor(ingredientList))
  .then(data => airtableSet(data))
  .catch(err => Error(err))
