/*
    ## Mock.Random
    
    工具类，用于生成各种随机数据。
*/

import { extend } from "../../utils/mock";

import * as address from "./mixins/address";
import * as basic from "./mixins/basic";

import * as date from "./date";
import * as image from "./image";
import * as color from "./color";
import * as text from "./text";
import * as name from "./name";
import * as web from "./web";

import * as helper from "./helper";
import * as misc from "./misc";

const Random = {
  ...address,
  ...basic,
  ...date,
  ...image,
  ...color,
  ...text,
  ...name,
  ...web,

  ...helper,
  ...misc,
} as unknown as RandomMethod;

export default Random;
