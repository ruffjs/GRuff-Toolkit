import DICT from "../dicts/web-dict";

export function url(this: RandomMethods, protocol: string, host: string) {
    return (protocol || this.protocol()) + '://' + // protocol?
        (host || this.domain()) + // host?
        '/' + this.word()
}

export function protocol(this: RandomMethods) {
    return this.pick(DICT.protocols)
}

export function domain(this: RandomMethods, tld?: string) {
    return this.word() + '.' + (tld || this.tld())
}

export function tld(this: RandomMethods) {
    return this.pick(DICT.tlds)
}

export function email(this: RandomMethods, domain?: string) {
    return this.character('lower') + '.' + this.word() + '@' +
        (
            domain ||
            (this.word() + '.' + this.tld())
        )
}

export function ipv4(this: RandomMethods) {
    return this.natural(0, 255) + '.' +
        this.natural(0, 255) + '.' +
        this.natural(0, 255) + '.' +
        this.natural(0, 255)
}

export const ip = ipv4