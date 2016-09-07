import React from 'react'
import {FormControl} from 'react-bootstrap'
import {Field, wrap} from './Field'

const TextField_ = (props) => (
	<Field {...props} component={FormControl} componentProps={{
		placeholder: props.label,
		autoComplete: 'off',
	}}/>
)

export const TextField = (props) => wrap(TextField_, props)

const TextDisplay_ = ({input: {value}}) => (
	<span>{value}</span>
)

export const TextDisplay = (props) => wrap(TextDisplay_, props)
