export const sites = {
  aquaCalc: {
    class: 'calculate',
    baseUrl: 'aqua-calc.com',
    type: 'food-',
    weightToVolume: {
      partialUrl: 'weight-to-volume',
      //TODO: fuzzy matching {currentType ; matchingType} {}
      lowestCommonParent: '#vwap',
      input: 'input[id=search-for-field]',
      type: 'select[#Unit]',
      submit: 'input[type=submit][value=Calculate]',
      value: 'table',
    }
  },
  myFitnessPal: {
    urlSnippets: {
      class: '/',
      func: '/' ,
    },
    baseUrl: 'myfitnesspal.com'
  },
  construct(addedString, baseUrl, superPage, type) {
    return `https://www.${baseUrl}/${superPage}/${type}${addedString}`}
}