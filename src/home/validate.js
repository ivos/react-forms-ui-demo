const add = (errors, field, error) => {
	if (errors[field]) {
		errors[field].push(error)
	} else {
		errors[field] = [error]
	}
}

const required = (errors, field, validation, value) => {
	if (validation.required && (null == value)) {
		add(errors, field, 'Required.')
	}
}

const minLength = (errors, field, {minLength}, value) => {
	if ((null != minLength) && value && (value.length < minLength)) {
		add(errors, field, `Must have at least ${minLength} characters.`)
	}
}

const maxLength = (errors, field, {maxLength}, value) => {
	if ((null != maxLength) && value && (value.length > maxLength)) {
		add(errors, field, `Must have at most ${maxLength} characters.`)
	}
}

const min = (errors, field, {min}, value) => {
	if ((null != min) && value && (value < min)) {
		add(errors, field, `Must be at least ${min}.`)
	}
}

const max = (errors, field, {max}, value) => {
	if ((null != max) && value && (value > max)) {
		add(errors, field, `Must be at most ${max}.`)
	}
}

const pattern = (errors, field, {pattern}, value) => {
	if ((null != pattern) && value && !pattern.test(value)) {
		add(errors, field, 'Invalid format.')
	}
}

export const validate = validations => values => {
	const errors = {}
	Object.keys(validations).forEach(field => {
		const validation = validations[field]
		const value = values[field];
		required(errors, field, validation, value)
		minLength(errors, field, validation, value)
		maxLength(errors, field, validation, value)
		min(errors, field, validation, value)
		max(errors, field, validation, value)
		pattern(errors, field, validation, value)
	})
	return errors
}

export const validateArray = (validations, name) => values => {
	const errors = {[name]: []}
	values[name].forEach((item, index) => {
		errors[name][index] = validate(validations)(item)
	})
	return errors
}
