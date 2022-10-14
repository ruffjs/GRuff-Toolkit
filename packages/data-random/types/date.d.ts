type RandomPatternLetter<K extends string = string> = Record<K, string | AnyFn>
type RandomDateUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'
type RandomDateUnit_Short = 'y' | 'w' | 'd' | 'h' | 's'
interface RandomMethods_Data {
    _datePattern: PatternLetter

    _rformat: RegExp

    _formatDate(date: Date, format: string): string

    _randomDate(min?: Date, max?: Date): Date

    date(format: string = 'yyyy-MM-dd'): string

    time(format: string = 'HH:mm:ss'): string

    datetime(format: string = 'yyyy-MM-dd HH:mm:ss'): string

    isotime(): string

    now(unit?: RandomDateUnit | RandomDateUnit_Short | '', format: string = 'yyyy-MM-dd HH:mm:ss'): string
}