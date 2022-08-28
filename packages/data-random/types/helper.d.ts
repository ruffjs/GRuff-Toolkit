interface RandomMethods_Helper {
    capitalize(word: string): string

    upper(str: string): string

    lower(str: string): string

    pick<T = any>(arr: T[]): T;
    pick<T = any>(...arr: T[]): T;
    pick<T = any>(arr: T[]): T;
    pick<T = any>(arr: T[], minLength: nummeric, maxLength: nummeric): T | T[];

    shuffle<T = any>(arr: T[], min: nummeric, max: nummeric): T[]

    repeat<T = any>(item: T | (() => T), time: number = 2): T[]
}