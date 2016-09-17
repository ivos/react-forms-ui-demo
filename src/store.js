import State from './state'

const delay = 300

export function getList(urlBase, options) {
	const result = State[urlBase].filter(function (item) {
		let matches = true
		if (options.data) {
			Object.keys(options.data).forEach(function (key) {
				if (typeof options.data[key] === 'string'
					&& !item[key].toLowerCase().startsWith(options.data[key].toLowerCase())) {
					matches = false
				}
				if (typeof options.data[key] === 'number'
					&& item[key] !== Number(options.data[key])) {
					matches = false
				}
			})
		}
		return matches
	}).map(function (item) {
		return expand(urlBase, item)
	})
	console.log('STORE GET /' + urlBase + '/', options, result)
	setTimeout(function () {
		options.success(result)
	}, delay)
}

export function getOne(urlBase, id, options) {
	if (!id && 0 !== id) {
		throw new Error('Id required, but was: [' + id + ']')
	}
	let result = State[urlBase][id]
	result = expand(urlBase, result)
	console.log('STORE GET /' + urlBase + '/' + id, options, result)
	setTimeout(function () {
		options.success(result)
	}, delay)
}

export function put(urlBase, id, options) {
	if (!id && 0 !== id) {
		throw new Error('Id required, but was: [' + id + ']')
	}
	const result = State[urlBase][id] = options.data
	console.log('STORE PUT /' + urlBase + '/' + id, options, result)
	setTimeout(function () {
		options.success(result)
	}, delay)
}

export function post(urlBase, options) {
	const array = State[urlBase]
	const id = !array.length ? 0 : array[array.length - 1].id + 1
	options.data.id = id
	array.push(options.data)
	const result = State[urlBase][id]
	console.log('STORE POST /' + urlBase + '/', options, result)
	setTimeout(function () {
		options.success(result)
	}, delay)
}

// expansion

function expand(urlBase, record) {
	if ('products' === urlBase) {
		record = Object.assign({}, record)
		if (null != record.group) {
			record.group = State.groups[record.group]
		}
	}
	return record
}
