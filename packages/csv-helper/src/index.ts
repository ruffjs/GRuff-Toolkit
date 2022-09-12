export type Column = {
  label: string
  prop: string
  required?: boolean
  only?: boolean
  options?: string[]
  validator?: (text: string) => string | null
}
type CsvToObjectReturn = [true, Record<string, string>[]] | [false, string]

const rowTextToArray = (rawText: string) => {
  let flag = false
  const columns: string[] = []
  rawText.split(",").forEach(rawColumn => {
    if (flag) {
      columns[columns.length - 1] += "," + rawColumn
    } else {
      columns.push(rawColumn)
    }
    if (rawColumn.startsWith('"')) {
      flag = true
    }
    if (rawColumn.endsWith('"')) {
      flag = false
    }
  })
  return columns.map(column => column.replace(/(^[\s\"]+|[\s\"]$)/g, ""))
}

const textToRows = (rawText: string) => {
  let lines = rawText.trim().split("\r\n")
  if (lines.length === 1) {
    const enters = rawText.split("\n")
    lines = enters.length === 1 ? lines : enters
  }
  // console.log(rawText, lines)
  return lines
    .filter(line => line.trim())
    .slice(1)
    .map(rowTextToArray)
}

export const csvToObject = (
  csvText: string,
  header: Column[]
): CsvToObjectReturn => {
  // console.log("csvToObject", header, csvText)
  let message = ""
  const objs: Array<Record<string, string>> = []
  const allOk = textToRows(csvText).every(row => {
    const obj: Record<string, string> = {}
    const ok = row.every((column, i) => {
      const { prop, label, required, options, only, validator } = header[i]
      if (required && !column) {
        message = `必填项[${label || prop}]不能为空`
        return false
      }
      if (options && column && !options.includes(column)) {
        message = `[${label || prop}]的值必须为{ ${options.join(
          "、"
        )} }之一，你提供的是[ ${column} ]`
        return false
      }
      if (only && column && objs.find(item => item[prop] === column)) {
        message = label + "不能重复"
        return false
      }
      if (validator !== undefined && typeof validator === "function") {
        message = validator(column) || ""
        // console.log(message)
        if (message) return false
      }
      obj[prop] = column
      return true
    })
    if (ok) {
      objs.push(obj)
      return true
    }
    return false
  })
  if (allOk) {
    return [true, objs]
  }
  return [false, message]
}

export const downloadString = (content: string, fileName = "download.csv") => {
  //  UTF-8字节顺序标记（byte-order mark，BOM）
  const blob = new Blob([Uint8Array.from([0xef, 0xbb, 0xbf]).buffer, content])
  let a: HTMLElement | null = document.querySelector("#__csv-file-helper")
  if (!a) {
    a = document.createElement("a")
    a.setAttribute("id", "__csv-file-helper")
      ; (<any>a).style = {
        position: "fixed",
        top: "-9999px",
        left: "-9999px",
        opacity: 0,
        zIndex: -9999,
      }
      ; (<HTMLAnchorElement>a).download = fileName
      ; (<HTMLAnchorElement>a).href = window.URL.createObjectURL(blob)
    document.body.appendChild(a)
  } else {
    ; (<HTMLAnchorElement>a).download = fileName
      ; (<HTMLAnchorElement>a).href = window.URL.createObjectURL(blob)
  }
  a.click()
}

const objToCsvText = (
  header: Column[],
  data: Record<string, string>[] = []
) => {
  const head = header.map(item => item.label).join(",")
  const body = data
    .map(row => {
      return (
        header
          .map(({ prop }) => {
            if (row[prop]) {
              if (row[prop].includes(",")) {
                return `"${row[prop]}"`
              } else {
                return row[prop]
              }
            } else {
              return " "
            }
          })
          .join(",") + "\n"
      )
    })
    .join("")
  // console.log(body)
  return [head, "\n", body].join("")
}

export const downloadAsCsv = (
  fileName: string,
  header: Column[],
  data: Record<string, string>[] = []
) => {
  const content = objToCsvText(header, data)
  // console.log("downloadAsCsv", content)
  downloadString(content, fileName)
  return [true, null]
}
