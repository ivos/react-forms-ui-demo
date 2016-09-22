import React from 'react'
import {emptyToNull} from '../ui/utils'
import {
	Panel, Form, Label, FormMessages,
	TextField, PasswordField, NumberField, DateField, DateRangeField, SelectField, BooleanField,
	TextControl, PasswordControl, NumberControl, DateControl, SelectControl, BooleanControl
} from 'react-forms-ui'
import {ButtonSave} from '../ui/buttons'
import {list} from '../api'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

const validations = {
	text: {
		required: true,
		minLength: 4,
		maxLength: 10,
		pattern: /^[0-9A-Z ]*$/,
	},
	password: {
		required: true,
	},
	number: {
		required: true,
	},
	date: {
		required: true,
	},
	drFrom: {
		required: true,
	},
	drTo: {
		required: true,
	},
	select: {
		required: true,
	},
	boolean: {},
}

const listCompanies = name => {
	return list('companies', {name})
}

const itemName = item => {
	return item.name
}

const TableForm = React.createClass({

	getInitialState() {
		return {}
	},

	render() {
		const {values} = this.state
		if (!values) {
			return <div></div>
		}
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form tableForm className="form-horizontal" state={this.state} setState={this.setState.bind(this)}
			      validations={validations} onSubmit={this.onSubmit}>
				<Panel content="panel-body" title={t('home.table.title')}>

					<Panel title={t('activityItems.title')}>
						<table className="table table-bordered table-condensed">
							<thead>
							<tr>
								<th><Label required>{t('home.table.text')}</Label></th>
								<th><Label required>{t('home.table.password')}</Label></th>
								<th><Label required>{t('home.table.number')}</Label></th>
								<th><Label required>{t('home.table.date')}</Label></th>
								<th><Label required>{t('home.table.dr')}</Label></th>
								<th><Label required>{t('home.table.select')}</Label></th>
								<th>{t('home.table.boolean')}</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>
									<TextField id="text" row={0} label={t('home.table.text')} classes={fieldClasses}
									           readonly/>
								</td>
								<td>
									<PasswordField id="password" row={0} label={t('home.table.password')}
									               classes={fieldClasses} readonly/>
								</td>
								<td>
									<NumberField id="number" row={0} label={t('home.table.number')}
									             classes={fieldClasses} readonly/>
								</td>
								<td>
									<DateField id="date" row={0} label={t('home.table.date')} classes={fieldClasses}
									           readonly/>
								</td>
								<td>
									<DateRangeField id="dr" row={0} label={t('home.table.dr')} classes={fieldClasses}
									                readonly/>
								</td>
								<td>
									<SelectField id="select" row={0} label={t('home.table.select')}
									             classes={fieldClasses} load={listCompanies} formatItem={itemName}
									             readonly/>
								</td>
								<td>
									<BooleanField id="boolean" row={0} label={t('home.table.boolean')}
									              classes={fieldClasses} readonly/>
								</td>
							</tr>
							<tr>
								<td>
									<TextControl value={values[1].text} readonly/>
								</td>
								<td>
									<PasswordControl value={values[1].password} readonly/>
								</td>
								<td>
									<NumberControl value={values[1].number} readonly/>
								</td>
								<td>
									<DateControl value={values[1].date} readonly/>
								</td>
								<td>
									<DateControl value={values[1].drFrom} readonly/>
									{' – '}
									<DateControl value={values[1].drTo} readonly/>
								</td>
								<td>
									<SelectControl value={values[1].select} formatItem={itemName} readonly/>
								</td>
								<td>
									<BooleanControl value={values[1].boolean} readonly/>
								</td>
							</tr>
							{values.map(function (item, index) {
								if (index <= 1) {
									return null
								}
								return (
									<tr key={item.id}>
										<td>
											<TextField id="text" row={index} label={t('home.table.text')}
											           classes={fieldClasses}/>
										</td>
										<td>
											<PasswordField id="password" row={index} label={t('home.table.password')}
											               classes={fieldClasses}/>
										</td>
										<td>
											<NumberField id="number" row={index} label={t('home.table.number')}
											             classes={fieldClasses}/>
										</td>
										<td>
											<DateField id="date" row={index} label={t('home.table.date')}
											           classes={fieldClasses}/>
										</td>
										<td>
											<DateRangeField id="dr" row={index} label={t('home.table.dr')}
											                classes={fieldClasses}/>
										</td>
										<td>
											<SelectField id="select" row={index} label={t('home.table.select')}
											             classes={fieldClasses} load={listCompanies}
											             formatItem={itemName}/>
										</td>
										<td>
											<BooleanField id="boolean" row={index} label={t('home.table.boolean')}
											              classes={fieldClasses}/>
										</td>
									</tr>
								)
							})}
							</tbody>
						</table>
					</Panel>

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
		this.setState({
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
					text: 'TXT CTROLS',
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
		})
	},

	onSubmit() {
		const {values} = this.state
		alert(t('home.sent') + `:\n\n${JSON.stringify(values, null, 2)}`)
		console.log(t('home.sent'), values)
	},

})

export default TableForm
