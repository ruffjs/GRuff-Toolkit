const p = (input: nummeric, radix?: number | undefined) =>
  parseInt(input as string, radix);

export function boolean(
  this: RandomMethods,
  less: nummeric,
  more: nummeric,
  value: boolean
) {
  if (value !== undefined) {
    less =
      typeof less !== "undefined" && !isNaN(less as number) ? p(less, 10) : 1;
    more =
      typeof more !== "undefined" && !isNaN(more as number) ? p(more, 10) : 1;
    return Math.random() > (1.0 / (less + more)) * less ? !value : value;
  }
  return Math.random() >= 0.5;
}
export const bool = boolean;

export function natural(this: RandomMethods, min: nummeric, max: nummeric) {
  min = typeof min !== "undefined" ? p(min, 10) : 0;
  max =
    typeof max !== "undefined" ? p(max, 10) : Number(Number(9007199254740992n)); // 2^53
  return Math.round(Math.random() * (max - min)) + min;
}

export function integer(this: RandomMethods, min: nummeric, max: nummeric) {
  min = typeof min !== "undefined" ? p(min, 10) : -Number(9007199254740992n);
  max = typeof max !== "undefined" ? p(max, 10) : Number(9007199254740992n); // 2^53
  return Math.round(Math.random() * (max - min)) + min;
}
export const int = integer;

export function float(
  this: RandomMethods,
  min: nummeric,
  max: nummeric,
  dmin: number,
  dmax: number
) {
  dmin = dmin === undefined ? 0 : dmin;
  dmin = Math.max(Math.min(dmin, 17), 0);
  dmax = dmax === undefined ? 17 : dmax;
  dmax = Math.max(Math.min(dmax, 17), 0);
  let ret = this.integer(min, max) + ".";
  for (let i = 0, dcount = this.natural(dmin, dmax); i < dcount; i++) {
    ret +=
      // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
      i < dcount - 1 ? this.character("number") : this.character("123456789");
  }
  return parseFloat(ret);
}

const all = Symbol(undefined);
export function character(this: RandomMethods, pool: string | Symbol = all) {
  const pools = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbol: "!@#$%^&*()[]",
    alpha: "",
    [all]: "",
  };
  type K = keyof typeof pools;

  pools.alpha = pools.lower + pools.upper;
  pools[all] = pools.lower + pools.upper + pools.number + pools.symbol;

  pool =
    pools[pool as typeof all] ||
    pools[(pool as string).toLowerCase() as K] ||
    (pool as string);
  return pool.charAt(this.natural(0, pool.length - 1));
}
export const char = character;

export function string(
  this: RandomMethods,
  pool: string | Symbol,
  minLength: nummeric,
  maxLength: nummeric
) {
  let len: number;
  switch (arguments.length) {
    case 0: // ()
      len = this.natural(3, 7);
      break;
    case 1: // ( length )
      len = pool as unknown as number;
      pool = all;
      break;
    case 2:
      // ( pool, length )
      if (typeof arguments[0] === "string") {
        len = Number(minLength);
      } else {
        // ( min, max )
        len = this.natural(pool as nummeric, minLength);
        pool = all;
      }
      break;
    case 3:
    default:
      len = this.natural(minLength, maxLength);
      break;
  }

  let text = "";
  for (var i = 0; i < len; i++) {
    text += this.character(pool);
  }

  return text;
}
export const str = string;

export function range(
  this: RandomMethods,
  start: number,
  stop: number,
  step: number
) {
  // range( stop )
  if (arguments.length <= 1) {
    stop = start || 0;
    start = 0;
  }
  // range( start, stop )
  step = arguments[2] || 1;

  start = +start;
  stop = +stop;
  step = +step;

  var len = Math.max(Math.ceil((stop - start) / step), 0);
  var idx = 0;
  var range = new Array(len);

  while (idx < len) {
    range[idx++] = start;
    start += step;
  }

  return range;
}

export function echo(this: RandomMethods, content: string = "") {
  return String(content);
}
