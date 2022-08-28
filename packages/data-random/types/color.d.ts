const _namedColors = {
    navy: {},
    blue: {},
    aqua: {},
    teal: {},
    olive: {},
    green: {},
    lime: {},
    yellow: {},
    orange: {},
    red: {},
    maroon: {},
    fuchsia: {},
    purple: {},
    silver: {},
    gray: {},
    black: {},
    white: {}
} as const
type RandomColorName = keyof typeof _namedColors
type RandomHashColor = string
type RandomNamedColor = {
    value: RandomHashColor
    nicer: RandomHashColor
}

interface RandomMethods_Color {
    _hue: number
    _goldenRatio: number

    color(name: RandomColorName): string

    hex(): string

    rgb(): string

    rgba(): string

    hsl(): string

    _goldenRatioColor(saturation?: number, value?: number): numbers
}