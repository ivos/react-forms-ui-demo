import React from 'react'
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {Field} from 'redux-form'
import Messages from './Messages'

const TextField = (props, context) => {
	// console.log('field props:', props)
	const {id, label, classes, readonly, children, input, meta: {error, active, touched, valid}} = props
	const clazz = classes.split(',')
	const {validations: {[id]: validation}} = context
	const validationState = (validation && !validation.noSuccess && touched) ?
		(!valid ? 'error' : 'success') : null
	const messages = touched ? error : null
	const required = validation && validation.required
	return (
		<FormGroup controlId={id} validationState={validationState}>
			<ControlLabel bsClass={'control-label ' + clazz[0]}>
				{label}
				{required ? <span className="_rfu-required" title={label}>&nbsp;*</span> : ''}
			</ControlLabel>
			<div className={clazz[1]}>
				{!readonly && <FormControl {...input} placeholder={label} autoComplete="off"/>}
				{readonly && <FormControl.Static>{input.value}</FormControl.Static>}
				<FormControl.Feedback />
				{children}
			</div>
			<div className={clazz[2]}>
				<Messages id={id} messages={messages}/>
			</div>
		</FormGroup>
	)
}

TextField.contextTypes = {
	validations: React.PropTypes.object.isRequired,
}

const TextFieldWrapper = ({id, name = id, ...rest}) => (
	<Field id={id} name={name} component={TextField} {...rest}/>
)

export default TextFieldWrapper
