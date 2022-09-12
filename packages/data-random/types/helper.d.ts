interface RandomMethods_Helper {
    capitalize(word: string): string

    upper(str: string): string

    lower(str: string): string

    pick<T = any>(arr: T[]): T;
    pick<T = any>(...arr: T[]): T;
    pick<T = any>(arr: T[]): T;
    pick<T = any>(arr: T[], minLength: Numeric, maxLength: Numeric): T | T[];

    shuffle<T = any>(arr: T[], min: Numeric, max: Numeric): T[]

    repeat<T = any>(item: T | (() => T), time: Numeric = 2): T[]
}