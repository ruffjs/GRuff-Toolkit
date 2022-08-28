/**
 * ## Miscellaneous
 */

import DICT from "../dicts/address-dict";

export function d4(this: RandomMethods) {
    return this.natural(1, 4);
}
export function d6(this: RandomMethods) {
    return this.natural(1, 6);
}
export function d8(this: RandomMethods) {
    return this.natural(1, 8);
}
export function d12(this: RandomMethods) {
    return this.natural(1, 12);
}
export function d20(this: RandomMethods) {
    return this.natural(1, 20);
}
export function d100(this: RandomMethods) {
    return this.natural(1, 100);
}

export function guid(this: RandomMethods) {
    var pool = "abcdefABCDEF1234567890",
        guid =
            this.string(pool, 8) +
            "-" +
            this.string(pool, 4) +
            "-" +
            this.string(pool, 4) +
            "-" +
            this.string(pool, 4) +
            "-" +
            this.string(pool, 12);
    return guid;
}

export const uuid = guid

export function id(this: RandomMethods) {
    let id: string,
        sum = 0,
        rank = [
            "7",
            "9",
            "10",
            "5",
            "8",
            "4",
            "2",
            "1",
            "6",
            "3",
            "7",
            "9",
            "10",
            "5",
            "8",
            "4",
            "2",
        ],
        last = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

    id = this.pick(DICT).id + this.date("yyyyMMdd") + this.string("number", 3);

    for (let i = 0; i < id.length; i++) {
        sum += Number(id[i]) * Number(rank[i]);
    }
    id += last[sum % 11];

    return id;
}

export function _genIncrement(start = 0) {
    return (step: number = 1) => {
        return (start += +step || 1);
    };
};

// export const increment = _genIncrement(0);

// export const inc = increment;
