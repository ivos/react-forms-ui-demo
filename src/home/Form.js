import React from 'react'
import {Form as BSForm} from 'react-bootstrap'

class Form extends React.Component {

	getChildContext() {
		const {validations} = this.props
		return {validations}
	}

	render() {
		const {children, validations /*remove!*/, ...rest} = this.props
		return (
			<BSForm {...rest}>
				{children}
			</BSForm>
		)
	}

}

Form.childContextTypes = {
	validations: React.PropTypes.object.isRequired
}

export default Form
