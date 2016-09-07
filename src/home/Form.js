import React from 'react'
import {Form as BSForm} from 'react-bootstrap'

class Form extends React.Component {

	getChildContext() {
		const {validations, tableForm} = this.props
		return {validations, tableForm}
	}

	render() {
		const {children, ...rest} = this.props
		delete rest.validations
		delete rest.tableForm
		return (
			<BSForm {...rest}>
				{children}
			</BSForm>
		)
	}
}

Form.childContextTypes = {
	validations: React.PropTypes.object.isRequired,
	tableForm: React.PropTypes.bool,
}

export default Form
