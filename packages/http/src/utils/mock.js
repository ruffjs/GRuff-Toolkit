export function extend() {
    var target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        options, name, src, copy, clone

    if (length === 1) {
        target = this
        i = 0
    }

    for (; i < length; i++) {
        options = arguments[i]
        if (!options) continue

        for (name in options) {
            src = target[name]
            copy = options[name]

            if (target === copy) continue
            if (copy === undefined) continue

            if (isArray(copy) || isObject(copy)) {
                if (isArray(copy)) clone = src && isArray(src) ? src : []
                if (isObject(copy)) clone = src && isObject(src) ? src : {}

                target[name] = extend(clone, copy)
            } else {
                target[name] = copy
            }
        }
    }
    return target
}

export function each(obj, iterator, context) {
    var i, key
    if (this.type(obj) === 'number') {
        for (i = 0; i < obj; i++) {
            iterator(i, i)
        }
    } else if (obj.length === +obj.length) {
        for (i = 0; i < obj.length; i++) {
            if (iterator.call(context, obj[i], i, obj) === false) break
        }
    } else {
        for (key in obj) {
            if (iterator.call(context, obj[key], key, obj) === false) break
        }
    }
}

export function type(obj) {
    return (obj === null || obj === undefined) ? String(obj) : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase()
}

export function isString(obj) {
    return type(obj) === 'string'
}

export function isObject(obj) {
    return type(obj) === 'object'
}


export function isArray(obj) {
    return type(obj) === 'array'
}


export function isRegExp(obj) {
    return type(obj) === 'regexp'
}


export function isFunction(obj) {
    return type(obj) === 'function'
}


export function isObjectOrArray(value) {
    return isObject(value) || isArray(value)
}

export function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value)
}

export function keys(obj) {
    var keys = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) keys.push(key)
    }
    return keys;
}

export function values(obj) {
    var values = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) values.push(obj[key])
    }
    return values;
}

export function heredoc(fn) {
    // 1. 移除起始的 function(){ /*!
    // 2. 移除末尾的 */ }
    // 3. 移除起始和末尾的空格
    return fn.toString()
        .replace(/^[^\/]+\/\*!?/, '')
        .replace(/\*\/[^\/]+$/, '')
        .replace(/^[\s\xA0]+/, '').replace(/[\s\xA0]+$/, '') // .trim()
}

export function noop() { }

export default {}