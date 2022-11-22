export function toGroups(sweetColumns: any[]): Record<string, AnyRecord[]> {
  const columns: any = {
    default: [],
  };
  sweetColumns.forEach((col) => {
    if (col.rfScope) {
      if (typeof col.rfScope === "string") {
        if (!columns[col.rfScope]) {
          columns[col.rfScope] = [];
        }
        columns[col.rfScope].push(col);
      } else if (
        typeof col.rfScope === "object" &&
        col.rfScope instanceof Array
      ) {
        col.rfScope.forEach((groupname: any) => {
          if (typeof groupname === "string") {
            if (!columns[groupname]) {
              columns[groupname] = [];
            }
            columns[groupname].push(col);
          }
        });
      }
    } else {
      columns.default.push(col);
    }
  });
  // console.log(columns);
  return columns;
}
