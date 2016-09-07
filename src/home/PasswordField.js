import React from 'react'
import {FormControl} from 'react-bootstrap'
import {Field, wrap} from './Field'

const formatDisplay = value => (value ? '********' : '')

const PasswordField_ = (props) => (
	<Field {...props} formatDisplay={formatDisplay} component={FormControl} componentProps={{
		type: 'password',
		placeholder: props.label,
		autoComplete: 'off',
	}}/>
)

export const PasswordField = (props) => wrap(PasswordField_, props)

const PasswordDisplay_ = ({input: {value}}) => (
	<span>{formatDisplay(value)}</span>
)

export const PasswordDisplay = (props) => wrap(PasswordDisplay_, props)
