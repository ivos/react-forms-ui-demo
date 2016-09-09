import React from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'
import {Field as RFField} from 'redux-form'
import Messages from './Messages'
import Label from './Label'

export const Field = (props, context) => {
	const {
		id, label, classes, readonly, component, componentProps, showFeedback = true, children, input,
		meta: {error, touched, valid}
	} = props
	const clazz = classes.split(',')
	const {validations, tableForm} = context
	const validationKey = tableForm ? id.split('.').pop() : id
	const validation = validations[validationKey]
	const validationState = (!readonly && validation && !validation.noSuccess && touched) ?
		(!valid ? 'error' : 'success') : null
	const messages = touched ? error : null
	const formGroupClass = (tableForm ? '_rfu-table-form-group' : '') + (!showFeedback ? ' _rfu-no-feedback-icon' : '')
	const finalComponentProps = Object.assign({}, {...input}, componentProps)
	return (
		<FormGroup controlId={id} validationState={validationState} className={formGroupClass}>
			{!tableForm && <Label id={id} className={clazz[0]}>{label}</Label>}
			<div className={tableForm ? 'col-xs-12' : clazz[1]}>
				{!readonly && React.createElement(component, finalComponentProps)}
				{readonly && <FormControl.Static>{input.value}</FormControl.Static>}
				{showFeedback && <FormControl.Feedback />}
				{children}
			</div>
			<div className={tableForm ? 'col-xs-12' : clazz[2]}>
				<Messages id={id} messages={messages}/>
			</div>
		</FormGroup>
	)
}

Field.contextTypes = {
	validations: React.PropTypes.object.isRequired,
	tableForm: React.PropTypes.bool,
}

Field.propTypes = {
	id: React.PropTypes.string.isRequired,
	name: React.PropTypes.string,
	label: React.PropTypes.string,
	classes: React.PropTypes.string.isRequired,
	readonly: React.PropTypes.bool,
	component: React.PropTypes.func.isRequired,
	componentProps: React.PropTypes.object,
	showFeedback: React.PropTypes.bool,
}

const emptyToNull = value => ('' === value) ? null : value

export const wrap = (component, {id, name = id, parse = emptyToNull, ...rest}) => (
	<RFField id={id} name={name} component={component} parse={parse} {...rest}/>
)
