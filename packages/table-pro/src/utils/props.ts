export const basic = {
  padding: [Number, String, Array],
  headerHeight: {
    type: [Number, String],
    default: "auto",
    required: false,
    validator(value: number | string | undefined) {
      if (typeof value === "number" && value >= 0) {
        return true;
      }
      if (typeof value === "string" && value === "auto") {
        return true;
      }
      return false;
    },
  },
  dataLength: Number,
  simplePagination: [Boolean],
  pagination: {
    type: [Object, Boolean],
    required: false,
    validator(value: AnyRecord | boolean | undefined) {
      if (typeof value === "object" || value === false) {
        return true;
      }
      return false;
    },
  },
};

export const hidableColumns = {
  ...basic,
  onHiddenCheck: Function,
  columns: {
    type: Array as () => AnyRecord[],
    default: [],
  },
};

export const variColumns = {
  ...basic,
  onHiddenCheck: Function,
  columns: {
    type: Object as () => Record<string, AnyRecord[]>,
    default: {
      default: [],
    },
  },
  groupIndex: {
    type: String,
    default: "default",
  },
};

export const embedCells = {
  ...basic,
  onHiddenCheck: Function,
  columns: {
    type: Array as () => AnyRecord[],
    default: [],
  },
  groupIndex: {
    type: String,
    default: "default",
  },
  rowKey: {
    type: String,
    required: true,
  },
  dataSource: {
    type: Array,
    default: [],
  },
};
