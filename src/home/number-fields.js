import React from 'react'
import {emptyToNull} from '../ui/utils'
import {Panel, Form, NumberField, FormMessages} from 'react-forms-ui'
import {ButtonSave} from '../ui/buttons'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

const validations = {
	numberFree: {},
	numberRequired: {
		required: true,
	},
	numberValue: {},
	numberValueRequired: {
		required: true,
	},
	numberCustomFormat: {
		required: true,
		min: 0,
	},
	numberMinMax: {
		required: true,
		min: 3,
		max: 30,
	}
}

const NumberFields = React.createClass({

	getInitialState() {
		return {}
	},

	render() {
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form className="form-horizontal" state={this.state} setState={this.setState.bind(this)}
			      validations={validations} onSubmit={this.onSubmit}>
				<Panel content="panel-body" title={t('home.number.title')}>
					<NumberField id="numberFree" label={t('home.number.numberFree')} classes={fieldClasses}/>
					<NumberField id="numberRequired" label={t('home.number.numberRequired')} classes={fieldClasses}/>
					<NumberField id="numberValue" label={t('home.number.numberValue.label')} classes={fieldClasses}>
						<span className="help-block">{t('home.number.numberValue.help')}</span>
					</NumberField>
					<NumberField id="numberValueRequired" label={t('home.number.numberValueRequired.label')}
					             classes={fieldClasses}>
						<span className="help-block">{t('home.number.numberValueRequired.help')}</span>
					</NumberField>
					<NumberField id="numberCustomFormat" label={t('home.number.numberCustomFormat.label')}
					             classes={fieldClasses} format="0.000">
						<span className="help-block">{t('home.number.numberCustomFormat.help')}</span>
					</NumberField>
					<NumberField id="numberMinMax" label={t('home.number.numberMinMax.label')} classes={fieldClasses}>
						<span className="help-block">{t('home.number.numberMinMax.help')}</span>
					</NumberField>
					<NumberField id="numberReadonly" label={t('home.number.numberReadonly')} classes={fieldClasses}
					             readonly/>
					<NumberField id="numberReadonlyEmpty" label={t('home.number.numberReadonlyEmpty')}
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

export default NumberFields
