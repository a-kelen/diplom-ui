export default function clone(obj) {
    let copy;
    if(null == obj || 'object' != typeof obj) return obj

    if(obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime())
        return copy
    }

    if(obj instanceof Array) {
        copy = [];
        for(let i = 0; i < obj.length; i++) {
            copy[i] = clone(obj[i])
        }
        return copy
    }
 
    if(obj instanceof Object) {
        copy = {}
        for (var attr in obj) {
            copy[attr] = clone(obj[attr])
        }
        return copy
    }

    throw new Error('Unable to copy obj!')
}
  