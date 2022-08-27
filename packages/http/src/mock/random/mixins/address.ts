import DICT from "../consts/address-dict";
const REGION = ["东北", "华北", "华东", "华中", "华南", "西南", "西北"];

export function region(this: RandomMethod) {
  return this.pick(REGION);
}

export function province(this: RandomMethod) {
  return this.pick(DICT).name;
}

export function city(this: RandomMethod, prefix: boolean) {
  const province = this.pick(DICT);
  if (province.children) {
    const city = this.pick(province.children);
    return prefix ? [province.name, city.name].join(" ") : city.name;
  }
  return prefix ? [province.name, "-"].join(" ") : "-";
}

export function county(this: RandomMethod, prefix: boolean) {
  const province = this.pick(DICT);
  if (province.children) {
    const city = this.pick(province.children);
    if (city.children) {
      const county = this.pick(city.children);
      return prefix
        ? [province.name, city.name, county.name].join(" ")
        : county.name;
    }
    return prefix ? [province.name, city.name, "-"].join(" ") : "-";
  }
  return prefix ? [province.name, "-"].join(" ") : "-";
}

export function zip(this: RandomMethod, len: number) {
  let zip = "";
  for (let i = 0; i < (len || 6); i++) zip += this.natural(0, 9);
  return zip;
}
