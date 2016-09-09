import React from 'react'
import {FormControl} from 'react-bootstrap'
import {Field, wrap} from './Field'

const TextField_ = (props) => (
	<Field {...props} component={FormControl} componentProps={{
		placeholder: props.placeholder || props.label,
		autoComplete: 'off',
	}}/>
)

export const TextField = (props) => wrap(TextField_, props)

TextField.propTypes = {
	id: React.PropTypes.string.isRequired,
	name: React.PropTypes.string,
	label: React.PropTypes.string,
	placeholder: React.PropTypes.string,
	classes: React.PropTypes.string.isRequired,
	readonly: React.PropTypes.bool,
}

const TextDisplay_ = ({input: {value}}) => (
	<span>{value}</span>
)

export const TextDisplay = (props) => wrap(TextDisplay_, props)

TextDisplay.propTypes = {
	id: React.PropTypes.string.isRequired,
}
