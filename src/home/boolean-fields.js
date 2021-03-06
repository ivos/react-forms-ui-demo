import React from 'react'
import {emptyToNull} from '../ui/utils'
import {Form, BooleanField, FormMessages} from 'react-forms-ui'
import {Panel, FormGroup} from 'react-bootstrap'
import {ButtonSave} from '../ui/buttons'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

const validations = {}

const BooleanFields = React.createClass({

	getInitialState() {
		return {}
	},

	render() {
		const fieldClasses = 'col-sm-offset-2 col-sm-10,,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form state={this.state} setState={this.setState.bind(this)} validations={validations}
			      onSubmit={this.onSubmit}>
				<Panel header={<h3>{t('home.boolean.title')}</h3>}>
					<FormGroup>
						<BooleanField id="bool" label={t('home.boolean.bool')} classes={fieldClasses}/>
						<BooleanField id="boolChecked" label={t('home.boolean.boolChecked')} classes={fieldClasses}/>
						<BooleanField id="boolRO" label={t('home.boolean.boolRO')} classes={fieldClasses} readonly/>
					</FormGroup>

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
				boolChecked: true,
				boolRO: true
			}
		})
	},

	onSubmit() {
		const {values} = this.state
		alert(t('home.sent') + `:\n\n${JSON.stringify(values, null, 2)}`)
		console.log(t('home.sent'), values)
	},

})

export default BooleanFields
