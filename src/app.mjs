import { default as fsWithCallbacks } from 'fs'
import { gather, Ingredient } from './data.mjs'
import { base, ingredients } from './airtableAccess.mjs';
import { fs, pipe, memoize } from './utils.mjs'
import { browse, search } from './scraper.mjs'
import { sites } from './sites.mjs'

pipe(
  gather,
  async v => console.log(await v.catch(err => Err(err)))
)('ingredients', ingredients.filter) 