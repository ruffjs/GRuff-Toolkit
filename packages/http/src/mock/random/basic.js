/*
    ## Basics
*/
export function boolean(min, max, cur) {
    if (cur !== undefined) {
        min = typeof min !== 'undefined' && !isNaN(min) ? parseInt(min, 10) : 1
        max = typeof max !== 'undefined' && !isNaN(max) ? parseInt(max, 10) : 1
        return Math.random() > 1.0 / (min + max) * min ? !cur : cur
    }

    return Math.random() >= 0.5
}
export function bool(min, max, cur) {
    return this.boolean(min, max, cur)
}
export function natural(min, max) {
    min = typeof min !== 'undefined' ? parseInt(min, 10) : 0
    max = typeof max !== 'undefined' ? parseInt(max, 10) : 9007199254740992 // 2^53
    return Math.round(Math.random() * (max - min)) + min
}
export function integer(min, max) {
    min = typeof min !== 'undefined' ? parseInt(min, 10) : -9007199254740992
    max = typeof max !== 'undefined' ? parseInt(max, 10) : 9007199254740992 // 2^53
    return Math.round(Math.random() * (max - min)) + min
}
export function int(min, max) {
    return this.integer(min, max)
}
export function float(min, max, dmin, dmax) {
    dmin = dmin === undefined ? 0 : dmin
    dmin = Math.max(Math.min(dmin, 17), 0)
    dmax = dmax === undefined ? 17 : dmax
    dmax = Math.max(Math.min(dmax, 17), 0)
    var ret = this.integer(min, max) + '.'
    for (var i = 0, dcount = this.natural(dmin, dmax); i < dcount; i++) {
        ret += (
            // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
            (i < dcount - 1) ? this.character('number') : this.character('123456789')
        )
    }
    return parseFloat(ret, 10)
}
export function character(pool) {
    var pools = {
        lower: 'abcdefghijklmnopqrstuvwxyz',
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        number: '0123456789',
        symbol: '!@#$%^&*()[]'
    }
    pools.alpha = pools.lower + pools.upper
    pools['undefined'] = pools.lower + pools.upper + pools.number + pools.symbol

    pool = pools[('' + pool).toLowerCase()] || pool
    return pool.charAt(this.natural(0, pool.length - 1))
}
export function char(pool) {
    return this.character(pool)
}
export function string(pool, min, max) {
    var len
    switch (arguments.length) {
        case 0: // ()
            len = this.natural(3, 7)
            break
        case 1: // ( length )
            len = pool
            pool = undefined
            break
        case 2:
            // ( pool, length )
            if (typeof arguments[0] === 'string') {
                len = min
            } else {
                // ( min, max )
                len = this.natural(pool, min)
                pool = undefined
            }
            break
        case 3:
            len = this.natural(min, max)
            break
    }

    var text = ''
    for (var i = 0; i < len; i++) {
        text += this.character(pool)
    }

    return text
}
export function str() {
    return this.string.apply(this, arguments)
}
export function range(start, stop, step) {
    // range( stop )
    if (arguments.length <= 1) {
        stop = start || 0
        start = 0
    }
    // range( start, stop )
    step = arguments[2] || 1

    start = +start
    stop = +stop
    step = +step

    var len = Math.max(Math.ceil((stop - start) / step), 0)
    var idx = 0
    var range = new Array(len)

    while (idx < len) {
        range[idx++] = start
        start += step
    }

    return range
}