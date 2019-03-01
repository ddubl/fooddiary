// generate a promise containing a data object per matching ingredient-record
import Airtable from 'airtable'
import { get } from 'https';

export const base = {
  apiKey: 'keyS0LQ7EUDrtTjdG',
  ingredients: {
    identifier: 'app7atiezt4S6DNK4',
    filter: {
      view: "Main View",
      fields: [
        "Name",
        "e",
        "p",
        "c",
        "f",
        "d",
        "recipes"
      ],
      filterByFormula: "recipes"
    }
  },
  get(baseObject = { ...base.ingredients }, key = base.apiKey) {
    return new Airtable({apiKey: `${key}`}).base(`${baseObject.identifier}`);
  }
}
