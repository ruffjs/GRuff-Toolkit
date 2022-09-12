import { hsv2rgb, rgb2hex, hsv2hsl } from '../utils/color-convert'
import DICT from '../dicts/color-dict'
import { toNum } from '../utils/type-convert'

export function color(this: RandomMethods, name: RandomColorName) {
    if (name || DICT[name])
        return DICT[name].nicer
    return this.hex()
}

export function hex(this: RandomMethods) {
    const hsv = this._goldenRatioColor()
    const rgb = hsv2rgb(hsv)
    return rgb2hex(rgb[0], rgb[1], rgb[2])
}

export function rgb(this: RandomMethods) {
    const hsv = this._goldenRatioColor()
    const rgb = hsv2rgb(hsv) as unknown as string[]
    return 'rgb(' +
        parseInt(rgb[0], 10) + ', ' +
        parseInt(rgb[1], 10) + ', ' +
        parseInt(rgb[2], 10) + ')'
}

export function rgba(this: RandomMethods) {
    const hsv = this._goldenRatioColor()
    const rgb = hsv2rgb(hsv) as unknown as string[]
    return 'rgba(' +
        parseInt(rgb[0], 10) + ', ' +
        parseInt(rgb[1], 10) + ', ' +
        parseInt(rgb[2], 10) + ', ' +
        Math.random().toFixed(2) + ')'
}

export function hsl(this: RandomMethods) {
    const hsv = this._goldenRatioColor()
    const hsl = hsv2hsl(hsv) as unknown as string[]
    return 'hsl(' +
        parseInt(hsl[0], 10) + ', ' +
        parseInt(hsl[1], 10) + ', ' +
        parseInt(hsl[2], 10) + ')'
}

export function _goldenRatioColor(this: RandomMethods, saturation?: Numeric, value?: Numeric) {
    this._goldenRatio = 0.618033988749895
    this._hue = this._hue || Math.random()
    this._hue += this._goldenRatio
    this._hue %= 1

    if (typeof saturation !== "number")
        saturation = saturation ? toNum(saturation) : 0.5
    if (typeof value !== "number")
        value = value ? toNum(value) : 0.95

    return [
        this._hue * 360,
        saturation * 100,
        value * 100
    ]
}