import React, {Component} from 'react'
import {ButtonSave} from '../ui/buttons'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import {Panel, FormGroup} from 'react-bootstrap'
import {reduxForm, formValueSelector} from 'redux-form'
import {SelectField} from './SelectField'
import Form from './Form'
import {validate} from './validate'
import FormMessages from './FormMessages'
import {list} from '../api'
import {connect} from 'react-redux'

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

const listCompanies = query => {
	return list('companies', {name: query})
}

const listGroups = query => {
	return list('groups', {name: query})
}

const listProducts = selectGroup => query => {
	if (!selectGroup) {
		return []
	}
	const group = selectGroup.id
	return list('products', {group, name: query})
}

const showSubmitted = values => {
	alert(`Submitted:\n\n${JSON.stringify(values, null, 2)}`)
}

const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
const buttonsClass = 'col-sm-offset-2 col-sm-10'

// var groupEmpty = (!values.selectGroup && 0 !== values.selectGroup);

class SelectFields extends Component {
	componentDidMount() {
		setTimeout(function () {
			this.props.initialize({
				selectValue: {id: 1, name: 'Acme'},
				selectValueRequired: {id: 2, name: 'First sales'},
				selectReadonly: {id: 3, name: 'Big wig'},
				selectReadonlyEmpty: null,
				selectGroup: {id: 0, name: 'Tea'},
				selectProduct: {id: 0, name: 'Earl grey tea'}
			})
		}.bind(this), 100)
	}

	render() {
		const {error, handleSubmit, groupEmpty, selectGroup} = this.props
		return (
			<Form horizontal validations={validations} onSubmit={handleSubmit(showSubmitted)}>
				<Panel header={(<h3>{t('home.select.title')}</h3>)}>
					<SelectField id="selectFree" label={t('home.select.selectFree')} classes={fieldClasses}
					             load={listCompanies} valueField="id" labelField="name"/>
					<SelectField id="selectRequired" label={t('home.select.selectRequired')} classes={fieldClasses}
					             load={listCompanies} valueField="id" labelField="name"/>
					<SelectField id="selectValue" label={t('home.select.selectValue')} classes={fieldClasses}
					             load={listCompanies} valueField="id" labelField="name"/>
					<SelectField id="selectValueRequired" label={t('home.select.selectValueRequired')}
					             classes={fieldClasses}
					             load={listCompanies} valueField="id" labelField="name"/>
					<SelectField id="selectReadonly" label={t('home.select.selectReadonly')} classes={fieldClasses}
					             valueField="id" labelField="name" readonly/>
					<SelectField id="selectReadonlyEmpty" label={t('home.select.selectReadonlyEmpty')}
					             classes={fieldClasses}
					             valueField="id" labelField="name" readonly/>
					<SelectField id="selectGroup" label={t('home.select.selectGroup')} classes={fieldClasses}
					             load={listGroups} valueField="id" labelField="name"/>
					<SelectField id="selectProduct" label={t('home.select.selectProduct')} classes={fieldClasses}
					             load={listProducts(selectGroup)} valueField="id" labelField="name"
					             disabled={groupEmpty}/>

					<FormGroup>
						<div className={buttonsClass}>
							<ButtonSave />
						</div>
					</FormGroup>

					<FormMessages error={error} className={buttonsClass}/>
				</Panel>
			</Form>
		)
	}
}

const selector = formValueSelector('SelectFields')

export default connect(state => {
		const selectGroup = selector(state, 'selectGroup')
		const groupEmpty = (null == selectGroup)
		return {groupEmpty, selectGroup}
	}
)(reduxForm({
	form: 'SelectFields',
	touchOnBlur: false,
	touchOnChange: true,
	validate: validate(validations),
})(SelectFields))


//


// getListGroups(query, callback)
// {
// 	getList('groups', {
// 		data: {name: query},
// 		success: callback
// 	});
// }
// ,
//
// formatItemGroup(item)
// {
// 	return item.name;
// }
// ,
//
// getListProducts(query, callback)
// {
// 	var group = this.state.values.selectGroup.id;
// 	getList('products', {
// 		data: {group, name: query},
// 		success: callback
// 	});
// }
// ,
//
// formatItemProduct(item)
// {
// 	return item.name;
// }
// ,
//
// componentDidUpdate(prevProps, prevState)
// {
// 	var {values} = this.state;
// 	var group = values.selectGroup;
// 	var prevGroup = prevState.values.selectGroup;
// 	if (prevGroup !== undefined && group !== prevGroup) {
// 		//TODO
// 		this.refs.selectProduct.initWidgetValue(null);
// 		values = Object.assign({}, values, {
// 			selectProduct: null
// 		});
// 		this.setState({values});
// 	}
// }
// ,
