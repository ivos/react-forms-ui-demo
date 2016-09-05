import React from 'react'
import {ButtonSave} from '../ui/buttons'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import {Button, Panel, FormGroup, ControlLabel, FormControl, HelpBlock, Row, Col} from 'react-bootstrap'
import {Field, reduxForm} from 'redux-form'
import TextField from './TextField'
import Form from './Form'
import validate from './validate'

const validations = {
	textFree: {},
	textRequired: {
		required: true,
	},
	textMinMax: {
		minLength: 4,
		maxLength: 10,
	},
	textMinMaxReq: {
		required: true,
		minLength: 4,
		maxLength: 10,
	},
	textNumbers: {
		pattern: /^[0-9]*$/,
	},
	textBackend: {
		required: true,
		noSuccess: true,
	},
	textValue: {},
	textValueRequired: {
		required: true,
	},
	textReadonly: {},
}

const showSubmitted = values => (alert(`Submitted:\n\n${JSON.stringify(values, null, 2)}`))

const TextFields = ({handleSubmit}) => {
	const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
	const buttonsClass = 'col-sm-offset-2 col-sm-10'
	return (
		<Form horizontal validations={validations} onSubmit={handleSubmit(showSubmitted)}>
			<Panel content="panel-body" header={(<h3>{t('home.text.title')}</h3>)}>
				<TextField id="textNotValidated" label={t('home.text.textNotValidated.label')} classes={fieldClasses}>
					<HelpBlock>{t('home.text.textNotValidated.help')}</HelpBlock>
				</TextField>
				<TextField id="textFree" label={t('home.text.textFree.label')} classes={fieldClasses}>
					{/*<HelpBlock>{t('home.text.textFree.help')}</HelpBlock>*/}
				</TextField>
				<TextField id="textRequired" label={t('home.text.textRequired')} classes={fieldClasses}/>
				<TextField id="textMinMax" label={t('home.text.textMinMax.label')}
				           placeholder={t('home.text.textMinMax.placeholder')} classes={fieldClasses}/>
				<TextField id="textMinMaxReq" label={t('home.text.textMinMaxReq.label')}
				           placeholder={t('home.text.textMinMaxReq.placeholder')} classes={fieldClasses} required>
					<span className="help-block">{t('home.text.textMinMaxReq.help')}</span>
				</TextField>
				<TextField id="textNumbers" label={t('home.text.textNumbers')} classes={fieldClasses}/>
				<TextField id="textBackend" label={t('home.text.textBackend.label')}
				           placeholder={t('home.text.textBackend.placeholder')} classes={fieldClasses} required>
					<span className="help-block">{t('home.text.textBackend.help')}</span>
				</TextField>
				<TextField id="textValue" label={t('home.text.textValue')} classes={fieldClasses}/>
				<TextField id="textValueRequired" label={t('home.text.textValueRequired')} classes={fieldClasses}
				           required/>
				<TextField id="textReadonly" label={t('home.text.textReadonly')}
				           classes={fieldClasses} readonly/>
				<TextField id="textReadonlyEmpty" label={t('home.text.textReadonlyEmpty')} classes={fieldClasses}
				           readonly/>

				<FormGroup>
					<div className={buttonsClass}>
						<ButtonSave />
					</div>
				</FormGroup>

				{/*<FormMessages form={this} ref="_form" className={buttonsClass}/>*/}
			</Panel>
		</Form>
	)
}

export default reduxForm({
	form: 'TextFields',
	touchOnBlur: false,
	touchOnChange: true,
	initialValues: {
		textValue: 'Initial value',
		textValueRequired: 'Initial value in required',
		textReadonly: 'Read-only value',
		textReadonlyEmpty: null
	},
	validate: validate(validations),
})(TextFields)
