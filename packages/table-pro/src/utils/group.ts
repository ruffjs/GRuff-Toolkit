export function toGroupedCols(
  sweetColumns: any[]
): Record<string, AnyRecord[]> {
  const columns: any = {
    default: [],
  };
  sweetColumns.forEach((col) => {
    if (col.rfColScope) {
      if (typeof col.rfColScope === "string") {
        if (!columns[col.rfColScope]) {
          columns[col.rfColScope] = [];
        }
        columns[col.rfColScope].push(col);
      } else if (
        typeof col.rfColScope === "object" &&
        col.rfColScope instanceof Array
      ) {
        col.rfColScope.forEach((groupname: any) => {
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
