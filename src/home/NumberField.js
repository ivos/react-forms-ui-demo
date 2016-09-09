import React from 'react'
import {FormControl} from 'react-bootstrap'
import {Field, wrap} from './Field'
import numeral from 'numeral'

const defaultFormat = '0,0.[00]'

const format = customFormat => value => {
	console.log('format', value, '=>', ('' !== value) ? numeral(value).format(customFormat) : '')
	return ('' !== value) ? numeral(value).format(customFormat) : ''
}
const parse = value => {
	console.log('parse', value, '=>', ('' !== value) ? numeral().unformat(value) : '')
	return ('' !== value) ? numeral().unformat(value) : null
}

const NumberField_ = (props) => (
	<Field {...props} component={FormControl} componentProps={{
		placeholder: props.label,
		autoComplete: 'off',
		className: 'text-right',
	}}/>
)

export const NumberField = (props) => {
	const customProps = Object.assign({}, props)
	const customFormat = customProps.format || defaultFormat
	customProps.customFormat = customFormat
	delete customProps.format
	console.log('customProps',customProps)
	return wrap(NumberField_, Object.assign({format: format(customFormat), parse}, customProps))
}

const NumberDisplay_ = ({input: {value}}) => (
	<span>{format(value)}</span>
)

export const NumberDisplay = (props) => wrap(NumberDisplay_, props)
