import React from 'react'
import {emptyToNull} from '../ui/utils'
import {Panel, Form, SelectField, FormMessages} from 'react-forms-ui'
import {ButtonSave} from '../ui/buttons'
import {list} from '../api'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

const validations = {
	selectFree: {},
	selectRequired: {
		required: true
	},
	selectValue: {},
	selectValueRequired: {
		required: true
	},
	selectGroup: {
		required: true
	},
	selectProduct: {}
}

const SelectFields = React.createClass({

	getInitialState() {
		return {}
	},

	render() {
		const {values} = this.state
		const groupEmpty = !values || (!values.selectGroup && 0 !== values.selectGroup)
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form className="form-horizontal" state={this.state} setState={this.setState.bind(this)}
			      validations={validations} onSubmit={this.onSubmit}>
				<Panel content="panel-body" title={t('home.select.title')}>
					<SelectField id="selectFree" label={t('home.select.selectFree')} classes={fieldClasses}
					             load={this.listCompanies} formatItem={this.formatItemCompany}/>
					<SelectField id="selectRequired" label={t('home.select.selectRequired')} classes={fieldClasses}
					             load={this.listCompanies} formatItem={this.formatItemCompany} required/>
					<SelectField id="selectValue" label={t('home.select.selectValue')} classes={fieldClasses}
					             load={this.listCompanies} formatItem={this.formatItemCompany}/>
					<SelectField id="selectValueRequired" label={t('home.select.selectValueRequired')}
					             classes={fieldClasses} load={this.listCompanies} formatItem={this.formatItemCompany}
					             required/>
					<SelectField id="selectReadonly" label={t('home.select.selectReadonly')} classes={fieldClasses}
					             formatItem={this.formatItemCompany} readonly/>
					<SelectField id="selectReadonlyEmpty" label={t('home.select.selectReadonlyEmpty')}
					             classes={fieldClasses} formatItem={this.formatItemCompany} readonly/>
					<SelectField id="selectGroup" label={t('home.select.selectGroup')} classes={fieldClasses}
					             load={this.listGroups} formatItem={this.formatItemGroup} required/>
					<SelectField ref="selectProduct" id="selectProduct" label={t('home.select.selectProduct')}
					             classes={fieldClasses} load={this.listProducts} formatItem={this.formatItemProduct}
					             disabled={groupEmpty}/>

					<div className="form-group">
						<div className={buttonsClass}>
							<ButtonSave />
						</div>
					</div>

					<FormMessages className={buttonsClass}/>

					{t('home.values')}
					<pre>{JSON.stringify(this.state.values, emptyToNull, 2)}</pre>
				</Panel>
			</Form>
		)
	},

	componentDidMount() {
		window.setTimeout(function () {
			this.setState({
				values: {
					selectValue: {id: 1, name: 'Acme'},
					selectValueRequired: {id: 2, name: 'First sales'},
					selectReadonly: {id: 3, name: 'Big wig'},
					selectReadonlyEmpty: null,
					selectGroup: {id: 0, name: 'Tea'},
					selectProduct: {id: 0, name: 'Earl grey tea'}
				}
			})
		}.bind(this), 100)
	},

	listCompanies(name) {
		return list('companies', {name})
	},

	formatItemCompany(item) {
		return item.name
	},

	listGroups(name) {
		return list('groups', {name})
	},

	formatItemGroup(item) {
		return item.name
	},

	listProducts(name) {
		const group = this.state.values.selectGroup.id
		return list('products', {group, name})
	},

	formatItemProduct(item) {
		return item.name
	},

	componentDidUpdate(prevProps, prevState) {
		if (prevState.values) {
			const {values} = this.state
			const group = values.selectGroup
			const prevGroup = prevState.values.selectGroup
			if (prevGroup !== undefined && group !== prevGroup) {
				//TODO
				this.refs.selectProduct.initWidgetValue(null)
				this.setState({values: {...values, selectProduct: null}})
			}
		}
	},

	onSubmit() {
		const {values} = this.state
		alert(t('home.sent') + `:\n\n${JSON.stringify(values, null, 2)}`)
		console.log(t('home.sent'), values)
	},

})

export default SelectFields
