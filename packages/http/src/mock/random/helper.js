/*
	## Helpers
*/

import { isArray } from '../../utils/mock'

export function capitalize(word) {
	return (word + '').charAt(0).toUpperCase() + (word + '').substr(1)
}
export function upper(str) {
	return (str + '').toUpperCase()
}
export function lower(str) {
	return (str + '').toLowerCase()
}
export function pick(arr, min, max) {
	// pick( item1, item2 ... )
	if (!isArray(arr)) {
		arr = [].slice.call(arguments)
		min = 1
		max = 1
	} else {
		// pick( [ item1, item2 ... ] )
		if (min === undefined)
			min = 1

		// pick( [ item1, item2 ... ], count )
		if (max === undefined)
			max = min
	}

	if (min === 1 && max === 1)
		return arr[this.natural(0, arr.length - 1)]

	// pick( [ item1, item2 ... ], min, max )
	return this.shuffle(arr, min, max)

}
export function shuffle(arr, min, max) {
	arr = arr || []
	var old = arr.slice(0), result = [], index = 0, length = old.length
	for (var i = 0; i < length; i++) {
		index = this.natural(0, old.length - 1)
		result.push(old[index])
		old.splice(index, 1)
	}
	switch (arguments.length) {
		case 0:
		case 1:
			return result
		case 2:
			max = min
		/* falls through */
		case 3:
			min = parseInt(min, 10)
			max = parseInt(max, 10)
			return result.slice(0, this.natural(min, max))
	}
}
export function order(array) {
	order.cache = order.cache || {}

	if (arguments.length > 1)
		array = [].slice.call(arguments, 0)

	// options.context.path/templatePath
	var options = order.options
	var templatePath = options.context.templatePath.join('.')

	var cache = (
		order.cache[templatePath] = order.cache[templatePath] || {
			index: 0,
			array: array
		}
	)

	return cache.array[cache.index++ % cache.array.length]
}