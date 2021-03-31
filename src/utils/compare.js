export default function compare(obj1, obj2) {
    if (null === obj1 || null === obj2 || 'object' !== typeof obj1 || 'object' !== typeof obj2)
      return obj1 === obj2;
  
    if (obj1 instanceof Array && obj2 instanceof Array) {
      if (obj1.length !== obj2.length) return false;
      let total = 0;
      for (var i = 0, len = obj1.length; i < len; i++) {
        if (compare(obj1[i], obj2[i])) total++;
      }
      return total === obj1.length;
    }

    if (obj1 instanceof Object && obj2 instanceof Object) {
      for (var attr in obj1) {
        if (compare(obj1[attr], obj2[attr]) === false) return false;
      }
      return true;
    }
  
    throw new Error('Not comparable');
  }