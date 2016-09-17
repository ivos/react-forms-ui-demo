import React from 'react'
import {withRouter} from 'react-router'
import {setTitle} from '../ui/utils'
import {FormMixin, Panel, Form, TextField, FormMessages} from 'react-forms-ui'
import Company from './company'
import {ButtonSave, LinkBack} from '../ui/buttons'
import Contact from '../contact/contact'
import Nested from '../shared/nested'
import pick from '../shared/pick'
import {getOne, put, post} from '../store'

const CompanyEdit = React.createClass({

	mixins: [FormMixin],

	validations: Object.assign(
		{},
		Company.validations,
		Nested.expand({invoicingContact: Contact.validations}, 'invoicingContact')
	),

	getInitialState: function () {
		return {
			values: {}
		}
	},

	render() {
		const {id} = this.props.params
		const {values} = this.state
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body"
				       title={<span><span className="text-muted">Company</span> <strong>{values.name}</strong></span>}>
					<div className="well well-sm well-white">
						<TextField ref="name" id="name" label="Name" classes={fieldClasses} required/>
						<TextField ref="taxId" id="taxId" label="Tax id" classes={fieldClasses}>
							<span
								className="help-block">Two upper-case letters and 2-14 digits or upper-case letters.</span>
						</TextField>
						<TextField ref="companyId" id="companyId" label="Company id" classes={fieldClasses}>
							<span className="help-block">Eight digits.</span>
						</TextField>
					</div>

					<Panel title="Invoicing contact" content="panel-body">
						<TextField ref="invoicingContact.name" id="invoicingContact.name" label="Name"
						           classes={fieldClasses} required/>
						<TextField ref="invoicingContact.phone" id="invoicingContact.phone" label="Phone"
						           classes={fieldClasses}/>
						<TextField ref="invoicingContact.email" id="invoicingContact.email" label="E-mail"
						           classes={fieldClasses}/>
						<TextField ref="invoicingContact.country" id="invoicingContact.country" label="Country"
						           classes={fieldClasses}/>
						<TextField ref="invoicingContact.city" id="invoicingContact.city" label="City"
						           classes={fieldClasses}/>
						<TextField ref="invoicingContact.street" id="invoicingContact.street" label="Street"
						           classes={fieldClasses}/>
						<TextField ref="invoicingContact.zip" id="invoicingContact.zip" label="ZIP"
						           classes={fieldClasses}/>
					</Panel>

					<div className="form-group">
						<div className={buttonsClass}>
							<ButtonSave />
							{id ?
								<LinkBack href={'#companies/' + id} title="Back to company detail."/>
								:
								<LinkBack href={'#companies'} title="Back to companies list."/>
							}
						</div>
					</div>

					<FormMessages form={this} ref="_form" className={buttonsClass}/>
				</Panel>
			</Form>
		)
	},

	componentDidMount() {
		const {id} = this.props.params
		if (id) {
			getOne('companies', id, {
				success: function (data) {
					const values = Nested.expand(data, 'invoicingContact')
					this.setState({values}, function () {
						this.focus()
						setTitle(id ? 'Edit company' : 'Create company')
					})
				}.bind(this)
			})
		}
	},

	onSubmit() {
		const {router, params:{id}} = this.props
		let {values} = this.state
		values = Nested.collapse(values, 'invoicingContact')
		const data = pick(values, 'id', 'name', 'taxId', 'companyId')
		data.invoicingContact = values.invoicingContact
		if (!id) {
			post('companies', {
				data,
				success(data) {
					router.push('/companies/' + data.id)
				}
			})
		} else {
			put('companies', values.id, {
				data,
				success(data) {
					router.push('/companies/' + values.id)
				}
			})
		}
	},

})

CompanyEdit.childContextTypes = {
	form: React.PropTypes.object
}

export default withRouter(CompanyEdit)
