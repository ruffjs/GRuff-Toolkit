export default function standardizeRoute(this: any, item: RuffSPAPageConfig) {
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
    if (item.alias) {
      if (item.alias instanceof Array && item.alias.length) {
        item.alias = item.alias.filter((alias: string) => alias !== item.path);
      } else {
        delete item.alias;
      }
    }
  } else if (item.alias) {
    if (item.alias instanceof Array && item.alias.length) {
      item.alias = item.alias.map((alias: string) => pathPrefix + alias);
    } else {
      item.alias = pathPrefix + <string>item.alias;
    }
  }

  if (_ruff_spa_shortName && _ruff_spa_shortName !== "workspace") {
    let _ruff_spa_accessBy = null;
    if (item.accessBy || this.meta?._ruff_spa_accessBy) {
      // console.log(
      //   "Access Description",
      //   _ruff_spa_shortName,
      //   item.accessBy,
      //   this.meta?._ruff_spa_accessBy
      // )
      if (this.meta?._ruff_spa_accessBy) {
        if (item.accessBy) {
          _ruff_spa_accessBy = [
            ...this.meta?._ruff_spa_accessBy,
            item.accessBy,
          ];
          delete item.accessBy;
        } else {
          _ruff_spa_accessBy = [...this.meta?._ruff_spa_accessBy];
        }
      } else {
        _ruff_spa_accessBy = [item.accessBy];
        delete item.accessBy;
      }
    }
    item.meta = {
      ...item.meta,
      _ruff_spa_shortName,
      _ruff_spa_accessBy,
    };
  }

  if (item.component) {
    if (item.children && item.children.length) {
      const names: string[] = [];
      item.children = item.children.map(standardizeRoute, item).filter((i) => {
        if (i === undefined) {
          return false;
        }
        if (i.name && names.includes(i.name)) {
          console.error(`route name "${i.name}" has been taken already.`);
          return false;
        }
        i.name && names.push(i.name);
        return true;
      }) as RuffSPAPageConfig[];
    }
  } else if (item.redirect) {
  } else {
    throw new TypeError("route must have a component or a redirect");
  }
  if (item.name || item.redirect) {
  } else {
    // throw new TypeError("route must have a name like attr");
    console.error("route must have a name-like attr");
    return undefined;
  }

  return item;
}
