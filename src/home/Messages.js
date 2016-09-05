import React from 'react'
import {Alert} from 'react-bootstrap'
import './Messages.css'

const Messages = ({id, messages}) => (
	<div>
		{messages && messages.map(message => (
			<Alert key={id + '.' + message} bsStyle="danger" className="_rfu-inline-message">
				<span className="_rfu-inline-message-icon glyphicon glyphicon-exclamation-sign"> </span>&nbsp;{message}
			</Alert>
		))}
	</div>
)

export default Messages
