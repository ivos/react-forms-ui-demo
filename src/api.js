import State from './state'

const delay = (value) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(value)
		}, 300)
	})
}

export function list(urlBase, data) {
	var result = State[urlBase].filter(function (item) {
		var matches = true
		if (data) {
			Object.keys(data).forEach(function (key) {
				if (typeof data[key] === 'string'
					&& !item[key].toLowerCase().startsWith(data[key].toLowerCase())) {
					matches = false
				}
				if (typeof data[key] === 'number'
					&& item[key] !== Number(data[key])) {
					matches = false
				}
			})
		}
		return matches
	}).map(function (item) {
		return expand(urlBase, item)
	})
	console.log('API GET /' + urlBase + '/', data, result)
	return delay(result)
}

export function read(urlBase, id, options) {
	if (!id && 0 !== id) {
		throw new Error('Id required, but was: [' + id + ']')
	}
	var result = State[urlBase][id]
	result = expand(urlBase, result)
	console.log('API GET /' + urlBase + '/' + id, options, result)
	setTimeout(function () {
		options.success(result)
	}, delay)
}

export function put(urlBase, id, options) {
	if (!id && 0 !== id) {
		throw new Error('Id required, but was: [' + id + ']')
	}
	var result = State[urlBase][id] = options.data
	console.log('API PUT /' + urlBase + '/' + id, options, result)
	setTimeout(function () {
		options.success(result)
	}, delay)
}

export function post(urlBase, options) {
	var array = State[urlBase]
	var id = !array.length ? 0 : array[array.length - 1].id + 1
	options.data.id = id
	array.push(options.data)
	var result = State[urlBase][id]
	console.log('API POST /' + urlBase + '/', options, result)
	setTimeout(function () {
		options.success(result)
	}, delay)
}

// expansion

function expand(urlBase, record) {
	if ('products' === urlBase) {
		record = {...record}
		if (null != record.group) {
			record.group = State.groups[record.group]
		}
	}
	return record
}
