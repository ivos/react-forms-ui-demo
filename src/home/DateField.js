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

const DateField_ = (props) => {
	const {minDate, maxDate, readonly, placeholder, label, input: {value}} = props
	if (readonly) {
		props.input.value = value ? moment(value).format(displayFormat) : ''
	}
	return (
		<Field {...props} component={DateTimePicker} componentProps={{
			placeholder: placeholder || label,
			time: false,
			format: displayFormat,
			min: minDate,
			max: maxDate,
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
	minDate: React.PropTypes.any,
	maxDate: React.PropTypes.any,
}

const DateDisplay_ = ({input: {value}}) => (
	<span>{value}</span>
)

export const DateDisplay = (props) => wrap(DateDisplay_, props)

DateDisplay.propTypes = {
	id: React.PropTypes.string.isRequired,
}
