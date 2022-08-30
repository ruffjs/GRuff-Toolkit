export default function standardizeRoute(
  this: any,
  item: RuffSPAPageConfig,
  index: number,
  arr: RuffSPAPageConfig[]
) {
  // console.log(this.name)
  if (typeof item.path !== "string") {
    throw new TypeError("type of path must be string");
  }
  let namePrefix = "";
  let pathPrefix = "/";
  if (this.name) {
    namePrefix = this.name + "/";
    pathPrefix = "";
  }
  let _ruff_spa_shortName = "";
  if (item.name) {
    _ruff_spa_shortName = item.name;
    item.name = namePrefix + _ruff_spa_shortName;
  } else {
    if (item.path) {
      _ruff_spa_shortName = item.path;
      item.name = namePrefix + _ruff_spa_shortName;
    } else if (item.alias) {
      if (item.alias instanceof Array && item.alias.length) {
        _ruff_spa_shortName = item.alias[0];
        item.name = namePrefix + _ruff_spa_shortName;
      } else if (typeof item.alias === "string") {
        _ruff_spa_shortName = item.alias;
        item.name = namePrefix + _ruff_spa_shortName;
      } else {
        throw new TypeError("type of alias can only be string or string[]");
      }
    }
  }
  if (item.path) {
    item.path = pathPrefix + item.path;
  } else if (item.alias) {
    if (item.alias instanceof Array && item.alias.length) {
      item.alias = item.alias.map((alias: string) => pathPrefix + alias);
    } else {
      item.alias = pathPrefix + <string>item.alias;
    }
  }

  if (_ruff_spa_shortName && _ruff_spa_shortName !== "workspace") {
    let _ruff_spa_accessDesc = null;
    if (item.accessDesc || this.meta?._ruff_spa_accessDesc) {
      // console.log(
      //   "Access Description",
      //   _ruff_spa_shortName,
      //   item.accessDesc,
      //   this.meta?._ruff_spa_accessDesc
      // )
      if (this.meta?._ruff_spa_accessDesc) {
        if (item.accessDesc) {
          _ruff_spa_accessDesc = [
            ...this.meta?._ruff_spa_accessDesc,
            item.accessDesc,
          ];
          delete item.accessDesc;
        } else {
          _ruff_spa_accessDesc = [...this.meta?._ruff_spa_accessDesc];
        }
      } else {
        _ruff_spa_accessDesc = [item.accessDesc];
        delete item.accessDesc;
      }
    }
    item.meta = {
      ...item.meta,
      _ruff_spa_shortName,
      _ruff_spa_accessDesc,
    };
  }

  if (item.component) {
    if (item.children && item.children.length) {
      item.children = item.children.map(standardizeRoute, item);
    }
  } else if (item.redirect) {
  } else {
    throw new TypeError("route must have a component or a redirect");
  }
  if (item.name || item.redirect) {
  } else {
    throw new TypeError("route must have a name like attr");
  }

  return item;
}
