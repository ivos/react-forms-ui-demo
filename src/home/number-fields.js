import React from 'react'
import {emptyToNull} from '../ui/utils'
import {FormMixin, Panel, Form, NumberField, FormMessages} from 'react-forms-ui'
import {ButtonSave} from '../ui/buttons'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

const NumberFields = React.createClass({

	mixins: [FormMixin],

	validations: {
		numberFree: {},
		numberRequired: {
			required: true
		},
		numberValue: {},
		numberValueRequired: {
			required: true
		},
		numberCustomFormat: {
			required: true,
			min: 0
		},
		numberMinMax: {
			required: true,
			min: 3,
			max: 30
		}
	},

	render() {
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.number.title')}>
					<NumberField ref="numberFree" id="numberFree" label={t('home.number.numberFree')}
					             classes={fieldClasses}/>
					<NumberField ref="numberRequired" id="numberRequired" label={t('home.number.numberRequired')}
					             classes={fieldClasses} required/>
					<NumberField ref="numberValue" id="numberValue" label={t('home.number.numberValue.label')}
					             classes={fieldClasses}>
						<span className="help-block">{t('home.number.numberValue.help')}</span>
					</NumberField>
					<NumberField ref="numberValueRequired" id="numberValueRequired"
					             label={t('home.number.numberValueRequired.label')} classes={fieldClasses} required>
						<span className="help-block">{t('home.number.numberValueRequired.help')}</span>
					</NumberField>
					<NumberField ref="numberCustomFormat" id="numberCustomFormat"
					             label={t('home.number.numberCustomFormat.label')} classes={fieldClasses} required
					             format="0.000">
						<span className="help-block">{t('home.number.numberCustomFormat.help')}</span>
					</NumberField>
					<NumberField ref="numberMinMax" id="numberMinMax" label={t('home.number.numberMinMax.label')}
					             classes={fieldClasses} required>
						<span className="help-block">{t('home.number.numberMinMax.help')}</span>
					</NumberField>
					<NumberField ref="numberReadonly" id="numberReadonly" label={t('home.number.numberReadonly')}
					             classes={fieldClasses} readonly/>
					<NumberField ref="numberReadonlyEmpty" id="numberReadonlyEmpty"
					             label={t('home.number.numberReadonlyEmpty')} classes={fieldClasses} readonly/>

					<div className="form-group">
						<div className={buttonsClass}>
							<ButtonSave />
						</div>
					</div>

					<FormMessages form={this} ref="_form" className={buttonsClass}/>

					{t('home.values')}
					<pre>{JSON.stringify(this.state.values, emptyToNull, 2)}</pre>
				</Panel>
			</Form>
		)
	},

	componentDidMount() {
		this.setState({
			values: {
				numberValue: 123000456.123456,
				numberValueRequired: 1000,
				numberReadonly: 23456.78901,
				numberReadonlyEmpty: null
			}
		})
	},

	onSubmit() {
		const {values} = this.state
		alert(t('home.sent') + `:\n\n${JSON.stringify(values, null, 2)}`)
		console.log(t('home.sent'), values)
	},

})

NumberFields.childContextTypes = {
	form: React.PropTypes.object
}

export default NumberFields
