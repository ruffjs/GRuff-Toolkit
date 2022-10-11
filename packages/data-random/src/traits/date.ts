import datePattern, { DatePatternFlag } from "../utils/date-pattern"

export const _datePattern = datePattern

export const _rformat = new RegExp((function () {
    const re = []
    for (let i in datePattern)
        re.push(i)
    return '(' + re.join('|') + ')'
})(), 'g')

export function _formatDate(this: RandomMethods, date: Date, format: string) {
    function creatNewSubString($0: string, flag: DatePatternFlag): string {
        if (typeof datePattern[flag] === 'function') {
            return (<AnyFn<string, Date[]>>datePattern[flag])(date)
        }
        if (<string>datePattern[flag] in datePattern) {
            return creatNewSubString($0, datePattern[flag] as DatePatternFlag)
        }
        return (date[datePattern[flag] as keyof Date] as AnyFn<string, any[]>)()
    }
    return format.replace(this._rformat, creatNewSubString)
}

export function _randomDate(this: RandomMethods, min?: Date, max?: Date) {
    min = min === undefined ? new Date(0) : min
    max = max === undefined ? new Date() : max
    return new Date(Math.random() * (max.getTime() - min.getTime()))
}

export function date(this: RandomMethods, format: string = 'yyyy-MM-dd') {
    return this._formatDate(this._randomDate(), format)
}
export function time(this: RandomMethods, format: string = 'HH:mm:ss') {
    return this._formatDate(this._randomDate(), format)
}
export function datetime(this: RandomMethods, format: string = 'yyyy-MM-dd HH:mm:ss') {
    return this._formatDate(this._randomDate(), format)
}

export function now(this: RandomMethods, unit: RandomDateUnit | RandomDateUnit_Short | '' = '', format: string = 'yyyy-MM-dd HH:mm:ss') {
    // now(unit) now(format)
    if (arguments.length === 1) {
        // now(format)
        if (!/^year|y|month|day|d|hour|h|minute|second|s|week|w$/i.test(unit)) {
            format = unit
            unit = ''
        }
    }
    unit = (unit || '').toLowerCase() as RandomDateUnit | RandomDateUnit_Short | ''

    const date = new Date()

    switch (unit) {
        case 'year':
        case 'y':
            date.setMonth(0)
        case 'month':
            date.setDate(1)
        case 'week':
        case 'w':
        case 'day':
        case 'd':
            date.setHours(0)
        case 'hour':
        case 'h':
            date.setMinutes(0)
        case 'minute':
            date.setSeconds(0)
        case 'second':
        case 's':
            date.setMilliseconds(0)
    }

    switch (unit) {
        case 'week':
        case 'w':
            date.setDate(date.getDate() - date.getDay())
    }

    return this._formatDate(date, format)
}