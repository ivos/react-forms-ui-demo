import React from 'react'
import ReactDOM from 'react-dom'
import {setTitle, focusFirst} from '../ui/utils'
import {Form, Panel, TextField, PlainField} from 'react-forms-ui'
import {LinkEdit, LinkBack} from '../ui/buttons'
import ContactDetail from '../contact/contact-detail'
import Nested from '../shared/nested'
import {getOne} from '../store'

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
			<Form className="form-horizontal" state={this.state} setState={this.setState.bind(this)}>
				<Panel content="panel-body"
				       title={<span><span className="text-muted">Company</span> <strong>{values.name}</strong></span>}>
					<div className="well well-sm well-white">

						<TextField id="name" label="Name" classes={fieldClasses} readonly/>

						<PlainField id="taxId" label="Tax id" classes={fieldClasses} readonly>
							<p className="form-control-static">{values.taxId ? <code>{values.taxId}</code> : ''}</p>
						</PlainField>

						<PlainField id="companyId" label="Company id" classes={fieldClasses} readonly>
							<p className="form-control-static">{values.companyId ?
								<code>{values.companyId}</code> : ''}</p>
						</PlainField>

					</div>

					<ContactDetail form={this} id="invoicingContact" label="Invoicing contact"/>

					<div ref="buttons" className={buttonsClass + 'form-group'}>
						<LinkEdit href={'#companies/' + id + '/edit'} title="Edit company data."/>
						<LinkBack href="#companies" title="Back to companies list."/>
					</div>
				</Panel>
			</Form>
		)
	},

	componentDidMount() {
		const {id} = this.props.params
		getOne('companies', id, {
			success: function (data) {
				const values = Nested.expand(data, 'invoicingContact')
				this.setState({values}, function () {
					focusFirst(ReactDOM.findDOMNode(this.refs.buttons))
					setTitle('Company')
				})
			}.bind(this)
		})
	},

})

export default CompanyDetail
