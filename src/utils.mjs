import { default as path } from 'path'
import { default as fsWithCallbacks } from 'fs'

export const fs = fsWithCallbacks.promises
export const __dirname = path.dirname(new URL(import.meta.url).pathname);
export function memoize(fn) {
  return function () {
      var args = Array.prototype.slice.call(arguments),
          hash = "",
          i = args.length;
      currentArg = null;
      while (i--) {
          currentArg = args[i];
          hash += (currentArg === Object(currentArg)) ?
          JSON.stringify(currentArg) : currentArg;
          fn.memoize || (fn.memoize = {});
      }
      return (hash in fn.memoize) ? fn.memoize[hash] :
      fn.memoize[hash] = fn.apply(this, args);
  };
}

/**
 * pipeAsFirstArg
 */
export const pipeFirst = (...fns) => x => fns.reduce((v, f) => f(v, ...arguments), x);

export function isEmpty(obj) {
  return obj == true
  ? false
  : true
}
