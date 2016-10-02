import React from 'react'
import {TextField, CustomField, Label} from 'react-forms-ui'
import {Panel, FormControl, FormGroup} from 'react-bootstrap'

export default React.createClass({

	render() {
		const {id, form, label} = this.props
		const {values = {}}= form.state
		const labelClass = 'col-sm-2'
		const fieldClass = 'col-sm-10'
		const fieldClasses = labelClass + ',' + fieldClass
		return (
			<Panel header={<h3>{label}</h3>}>
				<TextField id={id + '.name'} label="Name" classes={fieldClasses} readonly/>
				<TextField id={id + '.phone'} label="Phone" classes={fieldClasses} readonly/>
				<CustomField id={id + '.email'} label="E-mail" classes={fieldClasses} readonly>
					<a href={'mailto:' + values.email} target="_blank">{values[id + '.email']}</a>
				</CustomField>

				<FormGroup>
					<Label className={labelClass}>Address</Label>

					<div className={fieldClass}>
						<FormControl.Static>
							{values[id + '.street']}<br/>
							{values[id + '.zip']} {' '}
							{values[id + '.city']}<br/>
							{values[id + '.country']}
						</FormControl.Static>
					</div>
				</FormGroup>
			</Panel>
		)
	}

})
