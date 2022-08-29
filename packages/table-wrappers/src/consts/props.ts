export const basic = {
  padding: [Number, String, Array],
  headerHeight: {
    type: [Number, String],
    default: "auto",
    required: false,
    validator(value: number | string | undefined) {
      if (typeof value === "number" && value >= 0) {
        return true
      }
      if (typeof value === "string" && value === "auto") {
        return true
      }
      return false
    },
  },
  simplePagination: [Boolean],
  pagination: {
    type: [Object, Boolean],
    required: false,
    validator(value: AnyRecord | boolean | undefined) {
      if (typeof value === "object" || value === false) {
        return true
      }
      return false
    },
  },
}

export const variColumns = {
  ...basic,
  columns: {
    type: Object as () => Record<string, AnyRecord[]>,
    default: {
      default: [],
    },
  },
  columnKey: {
    type: String,
    default: "default",
  },
}
