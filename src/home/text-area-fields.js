import React from 'react'
import {emptyToNull} from '../ui/utils'
import {Form, TextAreaField, FormMessages} from 'react-forms-ui'
import {Panel, HelpBlock, FormGroup} from 'react-bootstrap'
import {ButtonSave} from '../ui/buttons'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

const validations = {
	textAreaFree: {},
	textAreaRequired: {
		required: true,
	},
	textAreaMinMaxReq: {
		required: true,
		minLength: 4,
		maxLength: 10,
	},
	textAreaValue: {},
	textAreaValueRequired: {
		required: true,
	},
	textAreaReadonly: {}
}

const TextAreaFields = React.createClass({

	getInitialState() {
		return {}
	},

	render() {
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form state={this.state} setState={this.setState.bind(this)} validations={validations}
			      onSubmit={this.onSubmit}>
				<Panel header={<h3>{t('home.textArea.title')}</h3>}>
					<TextAreaField id="textAreaFree" label={t('home.textArea.textAreaFree.label')}
					               classes={fieldClasses}>
						<HelpBlock>{t('home.textArea.textAreaFree.help')}</HelpBlock>
					</TextAreaField>
					<TextAreaField id="textAreaRequired" label={t('home.textArea.textAreaRequired')}
					               classes={fieldClasses} rows={5}/>
					<TextAreaField id="textAreaMinMaxReq" label={t('home.textArea.textAreaMinMaxReq.label')}
					               placeholder={t('home.textArea.textAreaMinMaxReq.placeholder')}
					               classes={fieldClasses}>
						<HelpBlock>{t('home.textArea.textAreaMinMaxReq.help')}</HelpBlock>
					</TextAreaField>
					<TextAreaField id="textAreaValue" label={t('home.textArea.textAreaValue')} classes={fieldClasses}/>
					<TextAreaField id="textAreaValueRequired" label={t('home.textArea.textAreaValueRequired')}
					               classes={fieldClasses}/>
					<TextAreaField id="textAreaReadonly" label={t('home.textArea.textAreaReadonly')}
					               classes={fieldClasses} readonly/>
					<TextAreaField id="textAreaROMulti" label={t('home.textArea.textAreaROMulti')}
					               classes={fieldClasses} readonly/>
					<TextAreaField id="textAreaReadonlyEmpty" label={t('home.textArea.textAreaReadonlyEmpty')}
					               classes={fieldClasses} readonly/>

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
				textAreaValue: 'Initial value',
				textAreaValueRequired: 'Initial value in required',
				textAreaReadonly: 'Read-only value.',
				textAreaROMulti: 'Read-only value.\nOn multiple rows.\nTo be shown properly on multiple rows as well.',
				textAreaReadonlyEmpty: null,
			}
		})
	},

	onSubmit() {
		const {values} = this.state
		alert(t('home.sent') + `:\n\n${JSON.stringify(values, null, 2)}`)
		console.log(t('home.sent'), values)
	},

})

export default TextAreaFields
