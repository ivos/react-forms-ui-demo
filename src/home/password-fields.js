import React from 'react'
import {emptyToNull} from '../ui/utils'
import {FormMixin, Panel, Form, PasswordField, FormMessages} from 'react-forms-ui'
import {ButtonSave} from '../ui/buttons'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

const PasswordFields = React.createClass({

	mixins: [FormMixin],

	validations: {
		passwordFree: {},
		passwordRequired: {
			required: true
		},
		passwordValue: {},
		passwordValueRequired: {
			required: true
		}
	},

	render() {
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.password.title')}>
					<PasswordField id="passwordFree" label={t('home.password.passwordFree')} classes={fieldClasses}/>
					<PasswordField id="passwordRequired" label={t('home.password.passwordRequired')}
					               classes={fieldClasses} required/>
					<PasswordField id="passwordValue" label={t('home.password.passwordValue')}
					               classes={fieldClasses}/>
					<PasswordField id="passwordValueRequired" label={t('home.password.passwordValueRequired.label')}
					               classes={fieldClasses} required>
						<span className="help-block">{t('home.password.passwordValueRequired.help')}</span>
					</PasswordField>
					<PasswordField id="passwordReadonly" label={t('home.password.passwordReadonly')}
					               classes={fieldClasses} readonly/>
					<PasswordField id="passwordReadonlyEmpty" label={t('home.password.passwordReadonlyEmpty')}
					               classes={fieldClasses} readonly/>

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
				passwordValue: 'secret',
				passwordValueRequired: 'secret required',
				passwordReadonly: 'readonly',
				passwordReadonlyEmpty: null
			}
		})
	},

	onSubmit() {
		const {values} = this.state
		alert(t('home.sent') + `:\n\n${JSON.stringify(values, null, 2)}`)
		console.log(t('home.sent'), values)
	},

})

PasswordFields.childContextTypes = {
	form: React.PropTypes.object
}

export default PasswordFields
