import React from 'react'
import {FormGroup} from 'react-bootstrap'
import Messages from './Messages'

const FormMessages = ({error, ...rest}) => {
	if (!error) {
		return <div/>
	}
	return (
		<FormGroup>
			<div {...rest}>
				<Messages id='_error' messages={error}/>
			</div>
		</FormGroup>
	)
}

export default FormMessages
