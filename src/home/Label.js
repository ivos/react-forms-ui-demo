import React from 'react'
import {ControlLabel} from 'react-bootstrap'

const Label = (props, context) => {
	const {id, className, children, ...rest} = props
	const {validations: {[id]: validation}} = context
	const required = validation && validation.required
	const label = 'Required.'
	return (
		<ControlLabel bsClass={'control-label ' + className} {...rest}>
			{children}
			{required ? <span className="_rfu-required" title={label}>&nbsp;*</span> : ''}
		</ControlLabel>
	)
}

Label.propTypes = {
	id: React.PropTypes.string.isRequired,
}

Label.contextTypes = {
	validations: React.PropTypes.object.isRequired,
}

export default Label
