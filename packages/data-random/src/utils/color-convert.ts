export function rgb2hsl(rgb: Int8Array) {
	const r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, min = Math.min(r, g, b),
		max = Math.max(r, g, b), delta = max - min
	let h = 0, s: number, l: number;

	if (max == min)
		h = 0;
	else if (r == max)
		h = (g - b) / delta;
	else if (g == max)
		h = 2 + (b - r) / delta;
	else if (b == max)
		h = 4 + (r - g) / delta;

	h = Math.min(h * 60, 360);

	if (h < 0)
		h += 360;

	l = (min + max) / 2;

	if (max == min)
		s = 0;
	else if (l <= 0.5)
		s = delta / (max + min);

	else
		s = delta / (2 - max - min);

	return [h, s * 100, l * 100];
}
export function rgb2hsv(rgb: Int8Array) {
	const r = rgb[0], g = rgb[1], b = rgb[2], min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min
	let h = 0, s: number, v: number;

	if (max === 0)
		s = 0;

	else
		s = (delta / max * 1000) / 10;

	if (max == min)
		h = 0;
	else if (r == max)
		h = (g - b) / delta;
	else if (g == max)
		h = 2 + (b - r) / delta;
	else if (b == max)
		h = 4 + (r - g) / delta;

	h = Math.min(h * 60, 360);

	if (h < 0)
		h += 360;

	v = ((max / 255) * 1000) / 10;

	return [h, s, v];
}
export function hsl2rgb(hsl: number[]) {
	const h = hsl[0] / 360, s = hsl[1] / 100, l = hsl[2] / 100
	let t1: number, t2: number, t3: number, val: number;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5)
		t2 = l * (1 + s);

	else
		t2 = l + s - l * s;
	t1 = 2 * l - t2;

	const rgb = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0)
			t3++;
		if (t3 > 1)
			t3--;

		if (6 * t3 < 1)
			val = t1 + (t2 - t1) * 6 * t3;
		else if (2 * t3 < 1)
			val = t2;
		else if (3 * t3 < 2)
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;

		else
			val = t1;

		rgb[i] = val * 255;
	}

	return rgb;
}

export function hsl2hsv(hsl: number[]) {
	const h = hsl[0]
	let s = hsl[1] / 100, l = hsl[2] / 100;
	l *= 2;
	s *= (l <= 1) ? l : 2 - l;

	const v = (l + s) / 2;
	const sv = (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
}

type HI = 0 | 1 | 2 | 3 | 4 | 5
export function hsv2rgb(hsv: number[]) {
	const h = hsv[0] / 60, s = hsv[1] / 100, hi = Math.floor(h) % 6 as HI;

	let v = hsv[2] / 100;

	const f = h - Math.floor(h), p = 255 * v * (1 - s), q = 255 * v * (1 - (s * f)), t = 255 * v * (1 - (s * (1 - f)));

	v = 255 * v;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
}

export function hsv2hsl(hsv: number[]) {
	const h = hsv[0], s = hsv[1] / 100, v = hsv[2] / 100
	let sl: number, l: number;

	l = (2 - s) * v;
	sl = s * v;
	sl /= (l <= 1) ? l : 2 - l;
	l /= 2;
	return [h, sl * 100, l * 100];
}

export function rgb2hex(
	a: Int32Array[number],
	b: Int32Array[number],
	c: Int32Array[number]
) {
	return "#" + ((256 + a << 8 | b) << 8 | c).toString(16).slice(1);
}

/**
 * 
 * @param a "#xxxxxx" hex string
 * @returns 
 */
export function hex2rgb(a: string) {
	const n = Number('0x' + a.slice(1).replace(a.length > 4 ? a : /./g, '$&$&')) | 0;
	return [n >> 16, n >> 8 & 255, n & 255];
}