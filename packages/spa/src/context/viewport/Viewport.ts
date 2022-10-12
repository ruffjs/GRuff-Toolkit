import flags from "./flags"

export default class Viewport {
  private static screen = window.screen
  private static viewport: Viewport

  static createViewport(
    boundaries: number[],
    commit: (states: AnyRecord) => void
  ) {
    Viewport.viewport = new Viewport()
    Viewport.viewport._commit = commit
    Viewport.viewport.onresize()
  }

  static setBoundaries(boundaries: number[]) {
    if (Viewport.viewport) {
      Viewport.viewport.boundaries = boundaries
    }
  }

  private _value = 1
  toValue() {
    return this._value
  }

  get mode() {
    return flags.Mobile & this._value ? "mobile" : "desktop"
  }

  get isWideScreen() {
    return Boolean(flags.Wide)
  }

  get angle() {
    return Viewport.screen?.orientation?.angle || 0
  }

  get angleMode() {
    return flags.Landscape & this.angle ? "landscape" : "portrait"
  }

  get size() {
    return {
      width: Viewport.screen.availWidth,
      height: Viewport.screen.availHeight,
    }
  }

  get width() {
    return Viewport.screen.availWidth
  }

  get height() {
    return Viewport.screen.availHeight
  }

  private _boundaries = {
    MP_TC: 576,
    TC_PC: 992,
    PC_HD: 2000,
  }

  get boundaries() {
    return [
      this._boundaries.MP_TC,
      this._boundaries.TC_PC,
      this._boundaries.PC_HD,
    ]
  }

  set boundaries(boundaries: number[]) {
    if (boundaries) {
      this._boundaries = {
        MP_TC: boundaries[0],
        TC_PC: boundaries[1],
        PC_HD: boundaries[2],
      }
    }
    this.onresize()
  }

  private constructor() {
    this.onresize = this.onresize.bind(this)
    window.addEventListener("resize", this.onresize)
  }

  private calculate() {
    this._value = 1
    if (this.width > this._boundaries.MP_TC) {
      this._value *= 2
    }

    if (this.width > this._boundaries.TC_PC) {
      this._value *= 2
    }

    if (this.width > this._boundaries.PC_HD) {
      this._value *= 2
    }
  }

  private _commit(states: AnyRecord, persistent?: boolean) {}

  private onresize() {
    const _viewDeviceMode =
      document.documentElement.getAttribute("data-media-mode")
    this.calculate()
    const viewDeviceMode = flags.Mobile & this._value ? "mobile" : "desktop"

    // console.log(size, this._value)
    let viewDeviceType = ""
    if (this._value & flags.MP) {
      viewDeviceType = "mobile"
    } else if (this._value & flags.TC) {
      viewDeviceType = "tablet"
    } else if (this._value & flags.PC) {
      viewDeviceType = "desktop"
    } else if (this._value & flags.HD) {
      viewDeviceType = "high-d"
    }

    document.documentElement.setAttribute("data-media-mode", viewDeviceMode)
    document.documentElement.setAttribute("data-media-type", viewDeviceType)
    this._commit({
      viewport: this._value,
      viewDeviceMode,
      viewDeviceType,
      viewAngleMode: flags.Landscape & this.angle ? "landscape" : "portrait",
    })
    if (_viewDeviceMode === "desktop" && viewDeviceMode === "mobile") {
      this._commit(
        {
          menuStatus: "collapsed",
        },
        true
      )
    }
  }

  public destructor() {
    window.removeEventListener("resize", this.onresize)
  }
}
