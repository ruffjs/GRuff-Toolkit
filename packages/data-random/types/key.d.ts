interface RandomMethods_Key {
    d4(): number
    d6(): number
    d8(): number
    d12(): number
    d20(): number
    d100(): number

    guid(): string
    uuid(): string

    id(): string

    _genIncrement(start: number): (step: number = 1) => number

    increment(step: number = 1): number

    inc(step: number = 1): number
}