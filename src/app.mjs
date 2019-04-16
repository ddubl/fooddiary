import { default as fsWithCallbacks } from 'fs'
import { gather } from './data.mjs'
import { base, ingredients } from './airtableAccess.mjs';
import { pipe, memoize } from './utils.mjs'
const fs = fsWithCallbacks.promises;

// rendering airtableobjects as general objects
// enable pipeline operator

// pipe(
//   gather,
//   async v => console.log(await v)
// )(base, ingredients.filter);

// TODO: article: nested asynchronous iterator chains
// resolving iteration process as nested loops


(
  async v => console.log(await v)
)(gather(base, ingredients.filter))