import React from 'react'
import ReactDOM from 'react-dom'
import {setTitle, focusFirst} from '../ui/utils'
import {Form, TextField, PlainField} from 'react-forms-ui'
import {Panel, FormControl} from 'react-bootstrap'
import {LinkEdit, LinkBack} from '../ui/buttons'
import ContactDetail from '../contact/contact-detail'
import Nested from '../shared/nested'
import {read} from '../api'

const CompanyDetail = React.createClass({

	getInitialState() {
		return {}
	},

	render() {
		const {id} = this.props.params
		const {values = {}} = this.state
		const fieldClasses = 'col-sm-2,col-sm-10'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form state={this.state} setState={this.setState.bind(this)}>
				<Panel header={<h3>
					<span className="text-muted">Company</span> <strong>{values.name}</strong>
				</h3>}>
					<Panel>

						<TextField id="name" label="Name" classes={fieldClasses} readonly/>

						<PlainField id="taxId" label="Tax id" classes={fieldClasses} readonly>
							<FormControl.Static>{values.taxId ? <code>{values.taxId}</code> : ''}</FormControl.Static>
						</PlainField>

						<PlainField id="companyId" label="Company id" classes={fieldClasses} readonly>
							<FormControl.Static>{values.companyId ?
								<code>{values.companyId}</code> : ''}</FormControl.Static>
						</PlainField>

					</Panel>

					<ContactDetail form={this} id="invoicingContact" label="Invoicing contact"/>

					<div ref="buttons" className={buttonsClass}>
						<LinkEdit href={'#companies/' + id + '/edit'} title="Edit company data."/>
						<LinkBack href="#companies" title="Back to companies list."/>
					</div>
				</Panel>
			</Form>
		)
	},

	componentDidMount() {
		const {id} = this.props.params
		read('companies', id).then(data => {
				const values = Nested.expand(data, 'invoicingContact')
				this.setState({values}, () => {
					focusFirst(ReactDOM.findDOMNode(this.refs.buttons))
					setTitle('Company')
				})
			}
		)
	},

})

export default CompanyDetail
