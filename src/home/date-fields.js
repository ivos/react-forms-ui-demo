import React from 'react'
import {ButtonSave} from '../ui/buttons'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import {Panel, FormGroup} from 'react-bootstrap'
import {reduxForm} from 'redux-form'
import {DateField} from './DateField'
import Form from './Form'
import {validate} from './validate'
import FormMessages from './FormMessages'
import moment from 'moment'

const validations = {
	dateFree: {},
	dateRequired: {
		required: true,
		min: '2016-10-10'
	},
	dateValue: {},
	dateValueRequired: {
		required: true,
	},
	dateMinMax: {
		required: true,
	}
}

const showSubmitted = values => {
	alert(`Submitted:\n\n${JSON.stringify(values, null, 2)}`)
}

const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
const buttonsClass = 'col-sm-offset-2 col-sm-10'

const DateFields = ({error, handleSubmit}) => (
	<Form horizontal validations={validations} onSubmit={handleSubmit(showSubmitted)}>
		<Panel header={(<h3>{t('home.date.title')}</h3>)}>
			<DateField id="dateFree" label={t('home.date.dateFree')} classes={fieldClasses}/>
			<DateField id="dateRequired" label={t('home.date.dateRequired')} classes={fieldClasses}/>
			<DateField id="dateValue" label={t('home.date.dateValue')} classes={fieldClasses}/>
			<DateField id="dateValueRequired" label={t('home.date.dateValueRequired.label')} classes={fieldClasses}>
				<span className="help-block">{t('home.date.dateValueRequired.help')}</span>
			</DateField>
			<DateField id="dateMinMax" label={t('home.date.dateMinMax.label')} classes={fieldClasses}
			           minDate={moment().startOf('day').subtract(7, 'days').toDate()}
			           maxDate={moment().startOf('day').add(7, 'days').toDate()}>
				<span className="help-block">{t('home.date.dateMinMax.help')}</span>
			</DateField>
			<DateField id="dateReadonly" label={t('home.date.dateReadonly')} classes={fieldClasses} readonly/>
			<DateField id="dateReadonlyEmpty" label={t('home.date.dateReadonlyEmpty')} classes={fieldClasses} readonly/>

			<FormGroup>
				<div className={buttonsClass}>
					<ButtonSave />
				</div>
			</FormGroup>

			<FormMessages error={error} className={buttonsClass}/>
		</Panel>
	</Form>
)

export default reduxForm({
	form: 'DateFields',
	touchOnBlur: false,
	touchOnChange: true,
	initialValues: {
		dateValue: '2015-10-20',
		dateValueRequired: '2015-10-21',
		dateReadonly: '2015-10-22',
		dateReadonlyEmpty: null
	},
	validate: validate(validations),
})(DateFields)
