import React from 'react'
import {ButtonSave} from '../ui/buttons'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import {Panel, FormGroup} from 'react-bootstrap'
import {reduxForm} from 'redux-form'
import {PasswordField} from './PasswordField'
import Form from './Form'
import {validate} from './validate'
import FormMessages from './FormMessages'

const validations = {
	passwordFree: {},
	passwordRequired: {
		required: true
	},
	passwordValue: {},
	passwordValueRequired: {
		required: true
	}
}

const showSubmitted = values => {
	alert(`Submitted:\n\n${JSON.stringify(values, null, 2)}`)
}

const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4';
const buttonsClass = 'col-sm-offset-2 col-sm-10';

const PasswordFields = ({error, handleSubmit}) => (
	<Form horizontal validations={validations} onSubmit={handleSubmit(showSubmitted)}>
		<Panel header={(<h3>{t('home.password.title')}</h3>)}>
			<PasswordField id="passwordFree" label={t('home.password.passwordFree')} classes={fieldClasses}/>
			<PasswordField id="passwordRequired" label={t('home.password.passwordRequired')} classes={fieldClasses}/>
			<PasswordField id="passwordValue" label={t('home.password.passwordValue')} classes={fieldClasses}/>
			<PasswordField id="passwordValueRequired" label={t('home.password.passwordValueRequired.label')}
			               classes={fieldClasses}>
				<span className="help-block">{t('home.password.passwordValueRequired.help')}</span>
			</PasswordField>
			<PasswordField id="passwordReadonly" label={t('home.password.passwordReadonly')} classes={fieldClasses}
			               readonly/>
			<PasswordField id="passwordReadonlyEmpty" label={t('home.password.passwordReadonlyEmpty')}
			               classes={fieldClasses} readonly/>

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
	form: 'PasswordFields',
	touchOnBlur: false,
	touchOnChange: true,
	initialValues: {
		passwordValue: 'secret',
		passwordValueRequired: 'secret required',
		passwordReadonly: 'readonly',
		passwordReadonlyEmpty: null
	},
	validate: validate(validations),
})(PasswordFields)
