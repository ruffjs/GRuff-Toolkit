import { DICT_KANZI } from "../dicts/text-dict";

function range(random: RandomMethods, defaultMin: nummeric, defaultMax: nummeric, min?: nummeric, max?: nummeric) {
    return min === undefined
        ? random.natural(defaultMin, defaultMax)
        : max === undefined
            ? min
            : random.natural(min, max);
}

export function paragraph(this: RandomMethods, min?: nummeric, max?: nummeric) {
    const len = range(this, 3, 7, min, max);
    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(this.sentence());
    }
    return result.join(" ");
}

export function cparagraph(this: RandomMethods, min?: nummeric, max?: nummeric) {
    const len = range(this, 3, 7, min, max);
    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(this.csentence());
    }
    return result.join("");
}
export function sentence(this: RandomMethods, min?: nummeric, max?: nummeric) {
    const len = range(this, 12, 18, min, max);
    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(this.word());
    }
    return this.capitalize(result.join(" ")) + ".";
}
export function csentence(this: RandomMethods, min?: nummeric, max?: nummeric) {
    const len = range(this, 12, 18, min, max);
    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(this.cword());
    }

    return result.join("") + "。";
}
export function word(this: RandomMethods, min?: nummeric, max?: nummeric) {
    const len = range(this, 3, 10, min, max);
    let result = "";
    for (let i = 0; i < len; i++) {
        result += this.character("lower");
    }
    return result;
}
export function cword(this: RandomMethods, pool: string, min?: nummeric, max?: nummeric) {
    // 最常用的 500 个汉字 http://baike.baidu.com/view/568436.htm

    let len: number;
    let result = "";
    switch (arguments.length) {
        case 0: // ()
            pool = DICT_KANZI;
            len = 1;
            break;
        case 1: // ( pool )
            if (typeof arguments[0] === "string") {
                len = 1;
            } else {
                // ( length )
                len = Number(pool);
                pool = DICT_KANZI;
            }
            break;
        case 2:
            // ( pool, length )
            if (typeof arguments[0] === "string") {
                len = Number(min);
            } else {
                // ( min, max )
                len = this.natural(Number(pool), min as nummeric);
                pool = DICT_KANZI;
            }
            break;
        case 3:
        default:
            len = this.natural(min as nummeric, max as nummeric);
            break;
    }

    for (let i = 0; i < len; i++) {
        result += pool.charAt(this.natural(0, pool.length - 1));
    }
    return result;
}
export function title(this: RandomMethods, min?: nummeric, max?: nummeric) {
    const len = range(this, 3, 7, min, max);
    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(this.capitalize(this.word()));
    }
    return result.join(" ");
}
export function ctitle(this: RandomMethods, min?: nummeric, max?: nummeric) {
    const len = range(this, 3, 7, min, max);
    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(this.cword());
    }
    return result.join("");
}
