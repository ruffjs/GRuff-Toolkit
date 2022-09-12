export type Numeric = string | number

export type IntNumeric = Numeric

export type FloatNumeric = Numeric

export type Bool = 'true' | 'false' | boolean

export type ObjectNotation = string | object

export type ObjectEmpty = {}

export const toNum = (input: Numeric) => parseFloat(input as string);

export const notNaN = (input: Numeric) => !isNaN(+input);

export const toInt = (input: IntNumeric, radix?: number | undefined) => parseInt(input as string, radix);

export const toFloat = (input: FloatNumeric) => parseFloat(input as string);

export const toBool = (input: Bool) => input === 'true' || input === true

export const toObject = <T extends object = any>(input: ObjectNotation): T | ObjectEmpty => {
    if (typeof input === 'string') {
        try {
            return JSON.parse(input)
        } catch (error) {
            return {}
        }
    }
    return input
}

export const MAX = Number(9007199254740992n)