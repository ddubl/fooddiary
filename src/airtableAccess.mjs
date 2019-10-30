// !! enterable through user-input
// generate a promise containing a data object per matching ingredient-record
import Airtable from 'airtable'
import { get } from 'https';

export const ingredients = {
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
};
const apiKey = 'keyS0LQ7EUDrtTjdG';

export const base = new Airtable({apiKey: `${apiKey}`}).base(`${ingredients.identifier}`)