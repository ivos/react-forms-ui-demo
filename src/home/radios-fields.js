import React from 'react'
import {emptyToNull} from '../ui/utils'
import {Form, RadiosField, FormMessages} from 'react-forms-ui'
import {Panel, FormGroup} from 'react-bootstrap'
import {ButtonSave} from '../ui/buttons'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

const validations = {
	radiosFree: {},
	radiosRequired: {
		required: true,
	},
	radiosVal: {},
	radiosReqVal: {
		required: true,
	},
	radiosReadonly: {},
}

const data = () => ({
	value1: 'Value 1',
	value2: <span>Value 2 with a <span className="label label-success">label</span></span>,
	valueA: t('home.radios.valueA'),
})

const RadiosFields = React.createClass({

	getInitialState() {
		return {}
	},

	render() {
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form state={this.state} setState={this.setState.bind(this)} validations={validations}
			      onSubmit={this.onSubmit}>
				<Panel header={<h3>{t('home.radios.title')}</h3>}>
					<RadiosField id="radiosFree" label={t('home.radios.radiosFree')} data={data()}
					             classes={fieldClasses}/>
					<RadiosField id="radiosRequired" label={t('home.radios.radiosRequired')} data={data()}
					             classes={fieldClasses}/>
					<RadiosField id="radiosVal" label={t('home.radios.radiosVal')} data={data()}
					             classes={fieldClasses}/>
					<RadiosField id="radiosReqVal" label={t('home.radios.radiosReqVal')} data={data()}
					             classes={fieldClasses}/>
					<RadiosField id="radiosReadonly" label={t('home.radios.radiosReadonly')} data={data()}
					             classes={fieldClasses} readonly/>
					<RadiosField id="radiosReadonlyEmpty" label={t('home.radios.radiosReadonlyEmpty')} data={data()}
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
				radiosVal: 'value1',
				radiosReqVal: 'valueA',
				radiosReadonly: 'value2',
				radiosReadonlyEmpty: null,
			}
		})
	},

	onSubmit() {
		const {values} = this.state
		alert(t('home.sent') + `:\n\n${JSON.stringify(values, null, 2)}`)
		console.log(t('home.sent'), values)
	},

})

export default RadiosFields
