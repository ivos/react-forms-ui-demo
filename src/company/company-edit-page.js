import React from 'react'
import {withRouter} from 'react-router'
import {setTitle} from '../ui/utils'
import {Form, TextField, FormMessages} from 'react-forms-ui'
import {Panel, FormGroup, HelpBlock} from 'react-bootstrap'
import Company from './company'
import {ButtonSave, LinkBack} from '../ui/buttons'
import Contact from '../contact/contact'
import Nested from '../shared/nested'
import pick from '../shared/pick'
import {read, put, post} from '../api'

const validations = Object.assign(
	{...Company.validations},
	Nested.expand({invoicingContact: Contact.validations}, 'invoicingContact')
)

const CompanyEdit = React.createClass({

	getInitialState: function () {
		return {}
	},

	render() {
		const {id} = this.props.params
		const {values = {}} = this.state
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form ref="form" state={this.state} setState={this.setState.bind(this)} validations={validations}
			      onSubmit={this.onSubmit}>
				<Panel header={<h3>
					<span className="text-muted">Company</span> <strong>{values.name}</strong>
				</h3>}>
					<Panel>
						<TextField id="name" label="Name" classes={fieldClasses}/>
						<TextField id="taxId" label="Tax id" classes={fieldClasses}>
							<HelpBlock>Two upper-case letters and 2-14 digits or upper-case letters.</HelpBlock>
						</TextField>
						<TextField id="companyId" label="Company id" classes={fieldClasses}>
							<HelpBlock>Eight digits.</HelpBlock>
						</TextField>
					</Panel>

					<Panel header={<h3>Invoicing contact</h3>}>
						<TextField id="invoicingContact.name" label="Name" classes={fieldClasses}/>
						<TextField id="invoicingContact.phone" label="Phone" classes={fieldClasses}/>
						<TextField id="invoicingContact.email" label="E-mail" classes={fieldClasses}/>
						<TextField id="invoicingContact.country" label="Country" classes={fieldClasses}/>
						<TextField id="invoicingContact.city" label="City" classes={fieldClasses}/>
						<TextField id="invoicingContact.street" label="Street" classes={fieldClasses}/>
						<TextField id="invoicingContact.zip" label="ZIP" classes={fieldClasses}/>
					</Panel>

					<FormGroup>
						<div className={buttonsClass}>
							<ButtonSave />
							{id ?
								<LinkBack href={'#companies/' + id} title="Back to company detail."/>
								:
								<LinkBack href={'#companies'} title="Back to companies list."/>
							}
						</div>
					</FormGroup>

					<FormMessages className={buttonsClass}/>
				</Panel>
			</Form>
		)
	},

	componentDidMount() {
		const {id} = this.props.params
		if (id) {
			read('companies', id).then(data => {
					const values = Nested.expand(data, 'invoicingContact')
					this.setState({values}, function () {
						this.refs.form.focus()
						setTitle(id ? 'Edit company' : 'Create company')
					})
				}
			)
		}
	},

	onSubmit() {
		const {router, params:{id}} = this.props
		let {values} = this.state
		values = Nested.collapse(values, 'invoicingContact')
		const data = pick(values, 'id', 'name', 'taxId', 'companyId')
		data.invoicingContact = values.invoicingContact
		if (!id) {
			post('companies', data).then(data => {
				router.push('/companies/' + data.id)
			})
		} else {
			put('companies', values.id, data).then(data => {
				router.push('/companies/' + values.id)
			})
		}
	},

})

export default withRouter(CompanyEdit)
