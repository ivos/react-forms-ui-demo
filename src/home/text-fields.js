import React from 'react'
import {emptyToNull} from '../ui/utils'
import {Form, TextField, FormMessages} from 'react-forms-ui'
import {Panel, HelpBlock, FormGroup} from 'react-bootstrap'
import {ButtonSave} from '../ui/buttons'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

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
		autoSuccess: false,
	},
	textValue: {},
	textValueRequired: {
		required: true,
	},
	textReadonly: {}
}

const TextFields = React.createClass({

	getInitialState() {
		return {}
	},

	render() {
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form state={this.state} setState={this.setState.bind(this)} validations={validations}
			      onSubmit={this.onSubmit}>
				<Panel header={<h3>{t('home.text.title')}</h3>}>
					<TextField id="textNotValidated" label={t('home.text.textNotValidated.label')}
					           classes={fieldClasses}>
						<HelpBlock>{t('home.text.textNotValidated.help')}</HelpBlock>
					</TextField>
					<TextField id="textFree" label={t('home.text.textFree')} classes={fieldClasses}/>
					<TextField id="textRequired" label={t('home.text.textRequired')} classes={fieldClasses}/>
					<TextField id="textMinMax" label={t('home.text.textMinMax.label')}
					           placeholder={t('home.text.textMinMax.placeholder')} classes={fieldClasses}/>
					<TextField id="textMinMaxReq" label={t('home.text.textMinMaxReq.label')}
					           placeholder={t('home.text.textMinMaxReq.placeholder')} classes={fieldClasses}>
						<HelpBlock>{t('home.text.textMinMaxReq.help')}</HelpBlock>
					</TextField>
					<TextField id="textNumbers" label={t('home.text.textNumbers')} classes={fieldClasses}/>
					<TextField id="textBackend" label={t('home.text.textBackend.label')}
					           placeholder={t('home.text.textBackend.placeholder')} classes={fieldClasses}>
						<HelpBlock>{t('home.text.textBackend.help')}</HelpBlock>
					</TextField>
					<TextField id="textValue" label={t('home.text.textValue')} classes={fieldClasses}/>
					<TextField id="textValueRequired" label={t('home.text.textValueRequired')} classes={fieldClasses}/>
					<TextField id="textReadonly" label={t('home.text.textReadonly')}
					           classes={fieldClasses} readonly/>
					<TextField id="textReadonlyEmpty" label={t('home.text.textReadonlyEmpty')} classes={fieldClasses}
					           readonly/>

					<FormGroup>
						<div className={buttonsClass}>
							<ButtonSave />
						</div>
					</FormGroup>

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
				textValue: 'Initial value',
				textValueRequired: 'Initial value in required',
				textReadonly: 'Read-only value',
				textReadonlyEmpty: null
			}
		})
	},

	onSubmit() {
		const {values} = this.state

		if (values.textBackend.length < 3) {
			const messages = {
				textBackend: ['Must have at least 3 characters.'],
				_form: ['There is an error.'],
			}
			this.setState({messages})
			return
		}

		alert(t('home.sent') + `:\n\n${JSON.stringify(values, null, 2)}`)
		console.log(t('home.sent'), values)
	},

})

export default TextFields
