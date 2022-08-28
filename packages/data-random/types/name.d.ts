interface RandomMethods_Name {
    _enFirstnameMale: string[]
    _enFirstnameFemale: string[]
    _enFirstname: string[]
    _enLastname: string[]
    _zhGivenname: string[]
    _zhSurname: string[]

    first(this: RandomMethods): string

    last(this: RandomMethods): string

    cfirst(this: RandomMethods): string

    clast(this: RandomMethods): string

    name(this: RandomMethods, middle = false): string

    cname(): string
}