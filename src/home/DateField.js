import React from 'react'
import {DateTimePicker} from 'react-widgets'
import {Field, wrap} from './Field'
import moment from 'moment'

const isoFormat = 'YYYY-MM-DD'
const displayFormat = 'l'

const format = value => value ? moment(value).toDate() : null
const parse = value => {
	const iso = value ? moment(value, displayFormat).format(isoFormat) : null
	if ('Invalid date' === iso) {
		return null;
	}
	return iso
}

const formatDisplay = value => value ? moment(value).format(displayFormat) : ''

const constrainValue = (value, min, max) => {
	if (value) {
		if (min && value < min) {
			return min
		}
		if (max && value > max) {
			return max
		}
	}
	return value
}

const DateField_ = (props) => {
	const {min, max, readonly, placeholder, label, input: {value, onChange}} = props
	if (readonly) {
		props.input.value = formatDisplay(value)
	}
	return (
		<Field {...props} component={DateTimePicker} componentProps={{
			placeholder: placeholder || label,
			time: false,
			format: displayFormat,
			min,
			max,
			onChange: (value) => {
				onChange(constrainValue(value, min, max))
			}
		}} showFeedback={false}/>
	)
}

export const DateField = (props) => wrap(DateField_, {...props, format, parse})

DateField.propTypes = {
	id: React.PropTypes.string.isRequired,
	name: React.PropTypes.string,
	label: React.PropTypes.string,
	placeholder: React.PropTypes.string,
	classes: React.PropTypes.string.isRequired,
	readonly: React.PropTypes.bool,
	min: React.PropTypes.any,
	max: React.PropTypes.any,
}

const DateDisplay_ = ({input: {value}}) => (
	<span>{formatDisplay(value)}</span>
)

export const DateDisplay = (props) => wrap(DateDisplay_, props)

DateDisplay.propTypes = {
	id: React.PropTypes.string.isRequired,
}
