import { DICT_KANZI } from "../dicts/text-dict";

function range(random: RandomMethods, defaultMin: Numeric, defaultMax: Numeric, min?: Numeric, max?: Numeric) {
    return min === undefined
        ? random.natural(defaultMin, defaultMax)
        : max === undefined
            ? min
            : random.natural(min, max);
}

export function paragraph(this: RandomMethods, min?: Numeric, max?: Numeric) {
    const len = range(this, 3, 7, min, max);
    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(this.sentence());
    }
    return result.join(" ");
}

export function cparagraph(this: RandomMethods, min?: Numeric, max?: Numeric) {
    const len = range(this, 3, 7, min, max);
    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(this.csentence());
    }
    return result.join("");
}
export function sentence(this: RandomMethods, min?: Numeric, max?: Numeric) {
    const len = range(this, 12, 18, min, max);
    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(this.word());
    }
    return this.capitalize(result.join(" ")) + ".";
}
export function csentence(this: RandomMethods, min?: Numeric, max?: Numeric) {
    const len = range(this, 12, 18, min, max);
    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(this.cword());
    }

    return result.join("") + "。";
}
export function word(this: RandomMethods, min?: Numeric, max?: Numeric) {
    const len = range(this, 3, 10, min, max);
    let result = "";
    for (let i = 0; i < len; i++) {
        result += this.character("lower");
    }
    return result;
}
export function cword(this: RandomMethods, min?: Numeric, max?: Numeric, pool?: string) {
    // 最常用的 500 个汉字 http://baike.baidu.com/view/568436.htm

    let len: number;
    let result = "";
    switch (arguments.length) {
        case 0: // ()
            pool = DICT_KANZI;
            len = 1;
            break;
        case 1: // ( pool )
            len = Number(min);
            pool = DICT_KANZI;
            break;
        case 2:
            // ( pool, length )
            len = this.natural(min, max);
            pool = DICT_KANZI;
            break;
        case 3:
        default:
            len = this.natural(min, max);
            pool = pool as string
            break;
    }

    for (let i = 0; i < len; i++) {
        result += pool.charAt(this.natural(0, pool.length - 1));
    }
    return result;
}
export function title(this: RandomMethods, min?: Numeric, max?: Numeric) {
    const len = range(this, 3, 7, min, max);
    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(this.capitalize(this.word()));
    }
    return result.join(" ");
}
export function ctitle(this: RandomMethods, min?: Numeric, max?: Numeric) {
    const len = range(this, 3, 7, min, max);
    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(this.cword());
    }
    return result.join("");
}

export function bigint(this: RandomMethods, min?: Numeric, max?: Numeric) {
    // 最常用的 500 个汉字 http://baike.baidu.com/view/568436.htm

    const pool = "0123456789"
    let len: number;
    let result = "";
    switch (arguments.length) {
        case 0:
            if (typeof arguments[0] === "string") {
                len = 1;
            } else {
                len = Number(pool);
            }
            break;
        case 1:
            if (typeof arguments[0] === "string") {
                len = Number(min);
            } else {
                len = this.natural(Number(pool), min);
            }
            break;
        case 2:
        default:
            len = this.natural(min, max);
            break;
    }

    for (let i = 0; i < len; i++) {
        result += pool.charAt(this.natural(0, pool.length - 1));
    }
    return result;
}
