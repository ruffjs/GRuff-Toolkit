import brandColors from "../dicts/brand-colors";
import { adSize, screenSize, videoSize } from "../utils/iamge-sizes";

export const _adSize = adSize
export const _screenSize = screenSize
export const _videoSize = videoSize
export const _brandColors = brandColors

export function _brandNames() {
    const brands = [];
    for (let b in _brandColors) {
        brands.push(b);
    }
    return brands;
}

export function image(
    this: RandomMethods,
    size: RandomAdSize | RandomScreenSize | RandomVideoSize | nummeric,
    background: RandomColorName | RandomHashColor,
    foreground: RandomColorName | RandomHashColor | undefined,
    format: RandomImageType | undefined,
    text: string
): string {
    // Random.image( size, background, foreground, text )
    if (arguments.length === 4) {
        text = format as string;
        format = undefined;
    }
    // Random.image( size, background, text )
    if (arguments.length === 3) {
        text = foreground as string;
        foreground = undefined;
    }
    // Random.image()
    if (!size) size = this.pick(this._adSize);

    if (background && ~background.indexOf("#")) background = background.slice(1);
    if (foreground && ~foreground.indexOf("#")) foreground = foreground.slice(1);

    // http://dummyimage.com/600x400/cc00cc/470047.png&text=hello
    return (
        "http://dummyimage.com/" +
        size +
        (background ? "/" + background : "") +
        (foreground ? "/" + foreground : "") +
        (format ? "." + format : "") +
        (text ? "&text=" + text : "")
    );
}

export const img = image

export function dataImage(this: RandomMethods, size: RandomAdSize | RandomScreenSize | RandomVideoSize | nummeric, text: string) {
    const canvas = document.createElement("canvas");
    // 此处删掉了 node-canvas 的创建，因为此工具改为纯前端工具

    const ctx = canvas && canvas.getContext && canvas.getContext("2d");
    if (!canvas || !ctx) return "";

    if (!size) size = this.pick(this._adSize);
    text = text !== undefined ? text : size as string;

    const sizeArray = String(size).split("x");

    const width = parseInt(sizeArray[0], 10),
        height = parseInt(sizeArray[1], 10) || width,
        background = this._brandColors[this.pick(this._brandNames())],
        foreground = "#FFF",
        text_height = 14,
        font = "sans-serif";

    canvas.width = width;
    canvas.height = height;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = foreground;
    ctx.font = "bold " + text_height + "px " + font;
    ctx.fillText(text, width / 2, height / 2, width);
    return canvas.toDataURL("image/png");
}