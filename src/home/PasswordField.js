import React from 'react'
import {FormControl} from 'react-bootstrap'
import {Field, wrap} from './Field'

const formatDisplay = value => (value ? '********' : '')

const PasswordField_ = (props) => {
	const {readonly, placeholder, label, input: {value}} = props
	if (readonly) {
		props.input.value = formatDisplay(value)
	}
	return (
		<Field {...props} component={FormControl} componentProps={{
			type: 'password',
			placeholder: placeholder || label,
			autoComplete: 'off',
		}}/>
	)
}

export const PasswordField = (props) => wrap(PasswordField_, props)

PasswordField.propTypes = {
	id: React.PropTypes.string.isRequired,
	name: React.PropTypes.string,
	label: React.PropTypes.string,
	placeholder: React.PropTypes.string,
	classes: React.PropTypes.string.isRequired,
	readonly: React.PropTypes.bool,
}

const PasswordDisplay_ = ({input: {value}}) => (
	<span>{formatDisplay(value)}</span>
)

export const PasswordDisplay = (props) => wrap(PasswordDisplay_, props)

PasswordDisplay.propTypes = {
	id: React.PropTypes.string.isRequired,
}
