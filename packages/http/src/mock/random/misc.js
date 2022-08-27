/*
	## Miscellaneous
*/
import DICT from './address_dict'
export function d4() {
	return this.natural(1, 4)
}
export function d6() {
	return this.natural(1, 6)
}
export function d8() {
	return this.natural(1, 8)
}
export function d12() {
	return this.natural(1, 12)
}
export function d20() {
	return this.natural(1, 20)
}
export function d100() {
	return this.natural(1, 100)
}
export function guid() {
	var pool = "abcdefABCDEF1234567890", guid = this.string(pool, 8) + '-' +
		this.string(pool, 4) + '-' +
		this.string(pool, 4) + '-' +
		this.string(pool, 4) + '-' +
		this.string(pool, 12)
	return guid
}
export function uuid() {
	return this.guid()
}
export function id() {
	var id, sum = 0, rank = [
		"7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"
	], last = [
		"1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"
	]

	id = this.pick(DICT).id +
		this.date('yyyyMMdd') +
		this.string('number', 3)

	for (var i = 0; i < id.length; i++) {
		sum += id[i] * rank[i]
	}
	id += last[sum % 11]

	return id
}
export const increment = function () {
	var key = 0
	return function (step) {
		return key += (+step || 1) // step?
	}
}()
export function inc(step) {
	return this.increment(step)
}