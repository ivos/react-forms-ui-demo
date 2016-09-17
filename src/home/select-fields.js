import React from 'react'
import {emptyToNull} from '../ui/utils'
import {FormMixin, Panel, Form, SelectField, FormMessages} from 'react-forms-ui'
import {ButtonSave} from '../ui/buttons'
import {getList} from '../store'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

const SelectFields = React.createClass({

	mixins: [FormMixin],

	validations: {
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
	},

	getInitialState: function () {
		return {
			values: {}
		}
	},

	render() {
		const {values} = this.state
		const groupEmpty = (!values.selectGroup && 0 !== values.selectGroup)
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.select.title')}>
					<SelectField ref="selectFree" id="selectFree" label={t('home.select.selectFree')}
					             classes={fieldClasses} getList={this.getListCompanies}
					             formatItem={this.formatItemCompany}/>
					<SelectField ref="selectRequired" id="selectRequired" label={t('home.select.selectRequired')}
					             classes={fieldClasses} getList={this.getListCompanies}
					             formatItem={this.formatItemCompany} required/>
					<SelectField ref="selectValue" id="selectValue" label={t('home.select.selectValue')}
					             classes={fieldClasses} getList={this.getListCompanies}
					             formatItem={this.formatItemCompany}/>
					<SelectField ref="selectValueRequired" id="selectValueRequired"
					             label={t('home.select.selectValueRequired')} classes={fieldClasses}
					             getList={this.getListCompanies} formatItem={this.formatItemCompany} required/>
					<SelectField ref="selectReadonly" id="selectReadonly"
					             label={t('home.select.selectReadonly')} classes={fieldClasses}
					             formatItem={this.formatItemCompany} readonly/>
					<SelectField ref="selectReadonlyEmpty" id="selectReadonlyEmpty"
					             label={t('home.select.selectReadonlyEmpty')} classes={fieldClasses}
					             formatItem={this.formatItemCompany} readonly/>
					<SelectField ref="selectGroup" id="selectGroup" label={t('home.select.selectGroup')}
					             classes={fieldClasses} getList={this.getListGroups}
					             formatItem={this.formatItemGroup} required/>
					<SelectField ref="selectProduct" id="selectProduct" label={t('home.select.selectProduct')}
					             classes={fieldClasses} getList={this.getListProducts}
					             formatItem={this.formatItemProduct} disabled={groupEmpty}/>

					<div className="form-group">
						<div className={buttonsClass}>
							<ButtonSave />
						</div>
					</div>

					<FormMessages form={this} ref="_form" className={buttonsClass}/>

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

	getListCompanies(query, callback) {
		getList('companies', {
			data: {name: query},
			success: callback
		})
	},

	formatItemCompany(item) {
		return item.name
	},

	getListGroups(query, callback) {
		getList('groups', {
			data: {name: query},
			success: callback
		})
	},

	formatItemGroup(item) {
		return item.name
	},

	getListProducts(query, callback) {
		const group = this.state.values.selectGroup.id
		getList('products', {
			data: {group, name: query},
			success: callback
		})
	},

	formatItemProduct(item) {
		return item.name
	},

	componentDidUpdate(prevProps, prevState) {
		let {values} = this.state
		const group = values.selectGroup
		const prevGroup = prevState.values.selectGroup
		if (prevGroup !== undefined && group !== prevGroup) {
			//TODO
			this.refs.selectProduct.initWidgetValue(null)
			values = Object.assign({}, values, {
				selectProduct: null
			})
			this.setState({values})
		}
	},

	onSubmit() {
		const {values} = this.state
		alert(t('home.sent') + `:\n\n${JSON.stringify(values, null, 2)}`)
		console.log(t('home.sent'), values)
	},

})

SelectFields.childContextTypes = {
	form: React.PropTypes.object
}

export default SelectFields
