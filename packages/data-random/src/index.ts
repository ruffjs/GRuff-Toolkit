/*
    ## Mock.Random
    
    工具类，用于生成各种随机数据。
*/

// import { extend } from "../../http/src/utils/mock";

import * as address from "./mixins/address";
import * as basic from "./mixins/basic";
import * as color from "./mixins/color";
import * as date from "./mixins/date";
import * as helper from "./mixins/helper";
import * as image from "./mixins/image";
import * as key from "./mixins/key";
import * as name from "./mixins/name";
import * as text from "./mixins/text";
import * as web from "./mixins/web";

const mixins = {
  ...address,
  ...basic,
  ...color,
  ...date,
  ...helper,
  ...image,
  ...key,
  ...name,
  ...text,
  ...web,
} as unknown as RandomExtendsOptions

class Random {
  static createRandom() {
    const random = new Random()
    return random as unknown as RandomMethods & Random
  }
  private constructor() {
    const inc = key._genIncrement(0)
    Object.assign(this, mixins, {
      inc,
      increment: inc
    })
  }

  extends<T extends RandomExtendsOptions = any>(methods: T) {
    type Target = typeof target
    const target = this

    for (let m in methods) {
      if ((target as any)[m]) continue;
      (target as any)[m] = methods[m];
    }
    return target as Target & T
  }
}

export default Random;
