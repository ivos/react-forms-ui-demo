import State from './state'

const delay = (value) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(value)
		}, 300)
	})
}

export function list(urlBase, data) {
	const result = State[urlBase].filter(function (item) {
		let matches = true
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

export function read(urlBase, id) {
	if (!id && 0 !== id) {
		throw new Error('Id required, but was: [' + id + ']')
	}
	let result = State[urlBase][id]
	result = expand(urlBase, result)
	console.log('API GET /' + urlBase + '/' + id, result)
	return delay(result)
}

export function put(urlBase, id, data) {
	if (!id && 0 !== id) {
		throw new Error('Id required, but was: [' + id + ']')
	}
	const result = State[urlBase][id] = data
	console.log('API PUT /' + urlBase + '/' + id, data, result)
	return delay(result)
}

export function post(urlBase, data) {
	const array = State[urlBase]
	const id = !array.length ? 0 : array[array.length - 1].id + 1
	data.id = id
	array.push(data)
	const result = State[urlBase][id]
	console.log('API POST /' + urlBase + '/', data, result)
	return delay(result)
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
