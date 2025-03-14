function isEqual(value1, value2) {
  if (value1 === value2) return true; // Handle primitives and same reference objects

  if (
    typeof value1 !== 'object' ||
    typeof value2 !== 'object' ||
    value1 === null ||
    value2 === null
  ) {
    return false; // If one is object and the other is not, return false
  }

  const keys1 = Object.keys(value1);
  const keys2 = Object.keys(value2);

  if (keys1.length !== keys2.length) return false; // Different number of keys means not equal

  for (let key of keys1) {
    if (!keys2.includes(key) || !isEqual(value1[key], value2[key])) {
      return false; // Recursively check nested objects
    }
  }

  return true;
}

function memoize(fn, resolver) {
  const cache = new Map();

  return function (...args) {
    // Use resolver function to create a cache key (or default to the first argument)
    const key = resolver ? resolver(...args) : args[0];

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

function nanoid() {
  return 'yxxxxxyxxxxxyxxxxyxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}

function classNames (classObject = {}, classString = '') {
  const objectKeys = Object.keys(classObject);
  let allClasses = classString ? `${classString} ` : '';

  objectKeys.forEach((key) => {
    allClasses += classObject[key] ? `${key} ` : '';
  })

  return allClasses.trim();
}

export { isEqual, memoize, nanoid, classNames };
