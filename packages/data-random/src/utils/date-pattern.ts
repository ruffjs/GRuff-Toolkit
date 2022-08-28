const datePattern = {
    yyyy: 'getFullYear',
    yy(date: Date) {
        return ('' + date.getFullYear()).slice(2)
    },
    y: 'yy',

    MM(date: Date) {
        var m = date.getMonth() + 1
        return m < 10 ? '0' + m : m
    },
    M(date: Date) {
        return date.getMonth() + 1
    },

    dd(date: Date) {
        var d = date.getDate()
        return d < 10 ? '0' + d : d
    },
    d: 'getDate',

    HH(date: Date) {
        var h = date.getHours()
        return h < 10 ? '0' + h : h
    },
    H: 'getHours',
    hh(date: Date) {
        var h = date.getHours() % 12
        return h < 10 ? '0' + h : h
    },
    h(date: Date) {
        return date.getHours() % 12
    },

    mm(date: Date) {
        var m = date.getMinutes()
        return m < 10 ? '0' + m : m
    },
    m: 'getMinutes',

    ss(date: Date) {
        var s = date.getSeconds()
        return s < 10 ? '0' + s : s
    },
    s: 'getSeconds',

    SS(date: Date) {
        var ms = date.getMilliseconds()
        return ms < 10 && '00' + ms || ms < 100 && '0' + ms || ms
    },
    S: 'getMilliseconds',

    A(date: Date) {
        return date.getHours() < 12 ? 'AM' : 'PM'
    },
    a(date: Date) {
        return date.getHours() < 12 ? 'am' : 'pm'
    },
    T: 'getTime'
}

export type DatePatternFlag = keyof typeof datePattern
export default datePattern as RandomPatternLetter<DatePatternFlag>