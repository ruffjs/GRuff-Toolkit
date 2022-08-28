type text = string
interface RandomMethods_Web {
    url(protocol: string, host: string): string

    protocol(): string

    domain(tld?: string): string

    tld(): string

    email(domain?: string): string

    ipv4(): string

    ip(): string
}