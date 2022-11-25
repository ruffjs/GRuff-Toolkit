export const analyzeHidableColumns = (columns: AnyArray, props: AnyRecord) => {
  const hiddens: any[] = [],
    showns = columns.filter((column: AnyRecord) => {
      if (column.hidden) {
        let hidden = false;
        if (typeof column.hidden === "function") {
          hidden = Boolean(column.hidden());
        } else if (typeof column.hidden === "boolean") {
          hidden = column.hidden;
        } else if (
          column.hidable == true &&
          typeof props.onHiddenCheck === "function"
        ) {
          hidden = Boolean(props.onHiddenCheck(column));
        }
        if (hidden) {
          hiddens.push(column);
          return false;
        }
      }
      return true;
    });
  return [showns, hiddens];
};
