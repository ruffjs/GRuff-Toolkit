/*
    ## Mock.Random
    
    工具类，用于生成各种随机数据。
*/

// import { extend } from "../../http/src/utils/mock";

import * as address from "./traits/address";
import * as basic from "./traits/basic";
import * as color from "./traits/color";
import * as date from "./traits/date";
import * as helper from "./traits/helper";
import * as image from "./traits/image";
import * as key from "./traits/key";
import * as name from "./traits/name";
import * as text from "./traits/text";
import * as web from "./traits/web";

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
