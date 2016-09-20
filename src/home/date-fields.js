import React from 'react'
import {emptyToNull} from '../ui/utils'
import {Panel, Form, DateField, FormMessages} from 'react-forms-ui'
import {ButtonSave} from '../ui/buttons'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import moment from 'moment'

const validations = {
	dateFree: {},
	dateRequired: {
		required: true
	},
	dateValue: {},
	dateValueRequired: {
		required: true
	},
	dateMinMax: {
		required: true
	}
}

const DateFields = React.createClass({

	getInitialState() {
		return {}
	},

	render() {
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form className="form-horizontal" state={this.state} setState={this.setState.bind(this)}
			      validations={validations} onSubmit={this.onSubmit}>
				<Panel content="panel-body" title={t('home.date.title')}>
					<DateField id="dateFree" label={t('home.date.dateFree')} classes={fieldClasses}/>
					<DateField id="dateRequired" label={t('home.date.dateRequired')} classes={fieldClasses} required/>
					<DateField id="dateValue" label={t('home.date.dateValue')} classes={fieldClasses}/>
					<DateField id="dateValueRequired" label={t('home.date.dateValueRequired.label')}
					           classes={fieldClasses} required>
						<span className="help-block">{t('home.date.dateValueRequired.help')}</span>
					</DateField>
					<DateField id="dateMinMax" label={t('home.date.dateMinMax.label')} classes={fieldClasses} required
					           min={moment().startOf('day').subtract(7, 'days')}
					           max={moment().startOf('day').add(7, 'days')}>
						<span className="help-block">{t('home.date.dateMinMax.help')}</span>
					</DateField>
					<DateField id="dateReadonly" label={t('home.date.dateReadonly')} classes={fieldClasses} readonly/>
					<DateField id="dateReadonlyEmpty" label={t('home.date.dateReadonlyEmpty')} classes={fieldClasses}
					           readonly/>

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
			values: {
				dateValue: '2015-10-20',
				dateValueRequired: '2015-10-21',
				dateReadonly: '2015-10-22',
				dateReadonlyEmpty: null
			}
		})
	},

	onSubmit() {
		const {values} = this.state
		alert(t('home.sent') + `:\n\n${JSON.stringify(values, null, 2)}`)
		console.log(t('home.sent'), values)
	},

})

export default DateFields
