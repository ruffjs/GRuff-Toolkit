import { en_firstname, en_firstname_female, en_firstname_male, en_lastname, zh_givenname, zh_surname } from "../dicts/name-lists";

export const _enFirstnameMale = en_firstname_male
export const _enFirstnameFemale = en_firstname_female
export const _enFirstname = en_firstname
export const _enLastname = en_lastname
export const _zhGivenname = zh_givenname
export const _zhSurname = zh_surname

export function first(this: RandomMethods) {
    return this.pick(en_firstname)
}

export function last(this: RandomMethods) {
    return this.pick(en_lastname)
}

export function cfirst(this: RandomMethods) {
    return this.pick(zh_surname)
}

export function clast(this: RandomMethods) {
    return this.pick(zh_givenname)
}

export function name(this: RandomMethods, middle: Bool = false) {
    return this.first() + ' ' +
        (middle ? this.first() + ' ' : '') +
        this.last()
}

export function cname(this: RandomMethods) {
    return this.cfirst() + this.clast()
}