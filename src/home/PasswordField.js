import React from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'
import {Field} from 'redux-form'
import Messages from './Messages'
import Label from './Label'

const format = value => (value ? '********' : '')

const PasswordField_ = (props, context) => {
	const {id, label, classes, readonly, children, input, meta: {error, touched, valid}} = props
	const clazz = classes.split(',')
	const {validations, tableForm} = context
	const validationKey = tableForm ? id.split('.').pop() : id
	const validation = validations[validationKey]
	const validationState = (!readonly && validation && !validation.noSuccess && touched) ?
		(!valid ? 'error' : 'success') : null
	const messages = touched ? error : null
	const formGroupClass = tableForm ? '_rfu-table-form-group' : ''
	return (
		<FormGroup controlId={id} validationState={validationState} className={formGroupClass}>
			{!tableForm && <Label id={id} className={clazz[0]}>{label}</Label>}
			<div className={tableForm ? 'col-xs-12' : clazz[1]}>
				{!readonly && <FormControl {...input} type="password" placeholder={label} autoComplete="off"/>}
				{readonly && <FormControl.Static>{format(input.value)}</FormControl.Static>}
				<FormControl.Feedback />
				{children}
			</div>
			<div className={tableForm ? 'col-xs-12' : clazz[2]}>
				<Messages id={id} messages={messages}/>
			</div>
		</FormGroup>
	)
}

PasswordField_.contextTypes = {
	validations: React.PropTypes.object.isRequired,
	tableForm: React.PropTypes.bool,
}

PasswordField_.propTypes = {
	id: React.PropTypes.string.isRequired,
	name: React.PropTypes.string,
	label: React.PropTypes.string,
	classes: React.PropTypes.string.isRequired,
	readonly: React.PropTypes.bool,
}

const wrap = (component, {id, name = id, ...rest}) => (
	<Field id={id} name={name} component={component} {...rest}/>
)

export const PasswordField = (props) => wrap(PasswordField_, props)

const PasswordDisplay_ = ({input: {value}}) => (
	<span>{format(value)}</span>
)

export const PasswordDisplay = (props) => wrap(PasswordDisplay_, props)
