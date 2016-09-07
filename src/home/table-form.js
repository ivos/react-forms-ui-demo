import React from 'react'
import ReactDOM from 'react-dom'
import {emptyToNull} from '../ui/utils'
import {ButtonSave} from '../ui/buttons'
import {getList} from '../api'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import {Panel, Table} from 'react-bootstrap'
import {Field, reduxForm, FieldArray} from 'redux-form'
import Form from './Form'
import {validateArray} from './validate'
import Label from './Label'
import {TextField, TextDisplay} from './TextField'
import FormMessages from './FormMessages'

const validations = {
	text: {
		required: true,
		minLength: 4,
		maxLength: 10,
		pattern: /^[0-9A-Z ]*$/
	},
	// password: {
	// 	required: true
	// },
	// number: {
	// 	required: true
	// },
	// date: {
	// 	required: true
	// },
	// drFrom: {
	// 	required: true
	// },
	// drTo: {
	// 	required: true
	// },
	// select: {
	// 	required: true
	// },
}

const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
const buttonsClass = 'col-sm-offset-2 col-sm-10'

const TableForm = ({error, handleSubmit}) => (
	<Form horizontal validations={validations} onSubmit={handleSubmit(showSubmitted)} tableForm>

		<Panel header={(<h3>{t('home.table.title.fields')}</h3>)}>
			<Table fill bordered condensed>
				<thead>
				<tr>
					<th><Label id="text">{t('home.table.text')}</Label></th>
					{/*<th><Label required>{t('home.table.password')}</Label></th>*/}
					{/*<th><Label required>{t('home.table.number')}</Label></th>*/}
					{/*<th><Label required>{t('home.table.date')}</Label></th>*/}
					{/*<th><Label required>{t('home.table.dr')}</Label></th>*/}
					{/*<th><Label required>{t('home.table.select')}</Label></th>*/}
					{/*<th>{t('home.table.boolean')}</th>*/}
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>
						<TextField id="values[0].text" label={t('home.table.text')} classes={fieldClasses}/>
					</td>
					{/*<td>*/}
					{/*<PasswordField form={this} ref="password-ro" id="password" row={0}*/}
					{/*label={t('home.table.password')} classes={fieldClasses}*/}
					{/*readonly/>*/}
					{/*</td>*/}
					{/*<td>*/}
					{/*<NumberField form={this} ref="number-ro" id="number" row={0}*/}
					{/*label={t('home.table.number')} classes={fieldClasses}*/}
					{/*readonly/>*/}
					{/*</td>*/}
					{/*<td>*/}
					{/*<DateField form={this} ref="date-ro" id="date" row={0}*/}
					{/*label={t('home.table.date')} classes={fieldClasses} readonly/>*/}
					{/*</td>*/}
					{/*<td>*/}
					{/*<DateRangeField form={this} ref="dr-ro" id="dr" row={0}*/}
					{/*label={t('home.table.dr')} classes={fieldClasses}*/}
					{/*readonly/>*/}
					{/*</td>*/}
					{/*<td>*/}
					{/*<SelectField form={this} ref="select-ro" id="select" row={0}*/}
					{/*label={t('home.table.select')} classes={fieldClasses}*/}
					{/*getList={this.getListCompanies}*/}
					{/*formatItem={this.formatItemCompany} readonly/>*/}
					{/*</td>*/}
					{/*<td>*/}
					{/*<BooleanField form={this} ref="boolean-ro" id="boolean" row={0}*/}
					{/*label={t('home.table.boolean')} classes={fieldClasses} readonly/>*/}
					{/*</td>*/}
				</tr>
				<tr>
					<td>
						<TextField id="values[1].text" label={t('home.table.text')} classes={fieldClasses} readonly/>
					</td>
				</tr>
				</tbody>
			</Table>
		</Panel>

		<Panel header={(<h3>{t('home.table.title.display')}</h3>)}>
			<Table fill bordered condensed>
				<thead>
				<tr>
					<th><Label id="text">{t('home.table.text')}</Label></th>
					{/*<th><Label required>{t('home.table.password')}</Label></th>*/}
					{/*<th><Label required>{t('home.table.number')}</Label></th>*/}
					{/*<th><Label required>{t('home.table.date')}</Label></th>*/}
					{/*<th><Label required>{t('home.table.dr')}</Label></th>*/}
					{/*<th><Label required>{t('home.table.select')}</Label></th>*/}
					{/*<th>{t('home.table.boolean')}</th>*/}
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>
						<TextDisplay id="values[1].text"/>
					</td>
					{/*<td>*/}
					{/*<PasswordControl value={values[1].password} readonly/>*/}
					{/*</td>*/}
					{/*<td>*/}
					{/*<NumberControl value={values[1].number} readonly/>*/}
					{/*</td>*/}
					{/*<td>*/}
					{/*<DateControl value={values[1].date} readonly/>*/}
					{/*</td>*/}
					{/*<td>*/}
					{/*<DateControl value={values[1].drFrom} readonly/>*/}
					{/*{' – '}*/}
					{/*<DateControl value={values[1].drTo} readonly/>*/}
					{/*</td>*/}
					{/*<td>*/}
					{/*<SelectControl value={values[1].select} formatItem={this.formatItemCompany}*/}
					{/*readonly/>*/}
					{/*</td>*/}
					{/*<td>*/}
					{/*<BooleanControl value={values[1].boolean} readonly/>*/}
					{/*</td>*/}
				</tr>
				</tbody>
			</Table>
		</Panel>

		<Panel header={(<h3>{t('home.table.title.array')}</h3>)}>
			<Table fill bordered condensed>
				<thead>
				<tr>
					<th><Label id="text">{t('home.table.text')}</Label></th>
					{/*<th><Label required>{t('home.table.password')}</Label></th>*/}
					{/*<th><Label required>{t('home.table.number')}</Label></th>*/}
					{/*<th><Label required>{t('home.table.date')}</Label></th>*/}
					{/*<th><Label required>{t('home.table.dr')}</Label></th>*/}
					{/*<th><Label required>{t('home.table.select')}</Label></th>*/}
					{/*<th>{t('home.table.boolean')}</th>*/}
				</tr>
				</thead>
				<FieldArray name="values" component={renderValues}/>
			</Table>
		</Panel>

		<div className="form-group">
			<div className={buttonsClass}>
				<ButtonSave />
			</div>
		</div>

		<FormMessages error={error} className={buttonsClass}/>
	</Form>
)

const renderValues = ({fields}) => {
	fields.forEach(field => console.log('field', field))
	return (
		<tbody>
		{fields.map((item, index) => {
			if (index <= 1) {
				return null
			}
			return (
				<tr key={item}>
					<td>
						<TextField id={`${item}.text`} row={index} label={t('home.table.text')} classes={fieldClasses}/>
					</td>
					{/*<td>*/}
					{/*<PasswordField form={this} ref={'password-'+index} id="password" row={index}*/}
					{/*label={t('home.table.password')} classes={fieldClasses}*/}
					{/*required/>*/}
					{/*</td>*/}
					{/*<td>*/}
					{/*<NumberField form={this} ref={'number-'+index} id="number" row={index}*/}
					{/*label={t('home.table.number')} classes={fieldClasses}*/}
					{/*required/>*/}
					{/*</td>*/}
					{/*<td>*/}
					{/*<DateField form={this} ref={'date-'+index} id="date" row={index}*/}
					{/*label={t('home.table.date')} classes={fieldClasses} required/>*/}
					{/*</td>*/}
					{/*<td>*/}
					{/*<DateRangeField form={this} ref={'dr-'+index} id="dr" row={index}*/}
					{/*label={t('home.table.dr')} classes={fieldClasses}*/}
					{/*required/>*/}
					{/*</td>*/}
					{/*<td>*/}
					{/*<SelectField form={this} ref={'select-'+index} id="select" row={index}*/}
					{/*label={t('home.table.select')} classes={fieldClasses}*/}
					{/*getList={this.getListCompanies}*/}
					{/*formatItem={this.formatItemCompany}/>*/}
					{/*</td>*/}
					{/*<td>*/}
					{/*<BooleanField form={this} ref={'boolean-'+index} id="boolean" row={index}*/}
					{/*label={t('home.table.boolean')} classes={fieldClasses}/>*/}
					{/*</td>*/}
				</tr>
			)
		})
		}
		</tbody>
	)
}

const getListCompanies = (query, callback) => {
	getList('companies', {
		data: {name: query},
		success: callback
	})
}

const formatItemCompany = item => {
	return item.name
}

const showSubmitted = values => {
	alert(`Submitted:\n\n${JSON.stringify(values, null, 2)}`)
}

export default reduxForm({
	form: 'TableForm',
	touchOnBlur: false,
	touchOnChange: true,
	initialValues: {
		values: [
			{
				id: 0,
				text: 'TXT FIELDS',
				password: 'Password RO',
				number: 2200.34,
				date: '2015-05-09',
				drFrom: '2015-06-18',
				drTo: '2015-06-19',
				select: {id: 0, name: 'First business'},
				boolean: true
			},
			{
				id: 1,
				text: 'TXT R ONLY',
				password: 'Password A',
				number: 2300.45,
				date: '2015-05-10',
				drFrom: '2015-06-20',
				drTo: '2015-06-21',
				select: {id: 1, name: 'Acme'},
				boolean: true
			},
			{
				id: 2,
				text: 'TEXT B',
				password: 'Password B',
				number: 2400.56,
				date: '2015-05-11',
				drFrom: '2015-06-22',
				drTo: '2015-06-23',
				select: {id: 2, name: 'First sales'},
				boolean: false
			},
			{
				id: 3,
				text: 'TEXT C',
				password: 'Password C',
				number: 2500.67,
				date: '2015-05-12',
				drFrom: '2015-06-24',
				drTo: '2015-06-25',
				select: {id: 3, name: 'Big wig'},
				boolean: true
			},
			{
				id: 4
			}
		]
	},
	validate: validateArray(validations, 'values'),
})(TableForm)
