/**
 * 
 * utils: replace fn call with result
 * @param fn 
 */

export function memoize2(fn) {
  const memoized = () => {
    return Function.call(fn, [...fn.arguments])
  }

  return (fn.memoized) ?
    fn.memoized :
    fn => { fn.memoized = memoized(fn) }
}

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

export function isEmpty(obj) {
  return obj == true ?
    false :
    true
}
