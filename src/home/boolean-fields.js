import React from 'react'
import {emptyToNull} from '../ui/utils'
import {FormMixin, Panel, Form, BooleanField, FormMessages} from 'react-forms-ui'
import {ButtonSave} from '../ui/buttons'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

const BooleanFields = React.createClass({

	mixins: [FormMixin],

	validations: {},

	render() {
		const fieldClasses = 'col-sm-offset-2 col-sm-10,,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.boolean.title')}>
					<BooleanField ref="bool" id="bool" label={t('home.boolean.bool')} classes={fieldClasses}/>
					<BooleanField ref="boolChecked" id="boolChecked" label={t('home.boolean.boolChecked')}
					              classes={fieldClasses}/>
					<BooleanField ref="boolRO" id="boolRO" label={t('home.boolean.boolRO')} classes={fieldClasses}
					              readonly/>

					<div className="form-group">
						<div className={buttonsClass}>
							<ButtonSave />
						</div>
					</div>

					<FormMessages ref="_form" className={buttonsClass}/>

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

BooleanFields.childContextTypes = {
	form: React.PropTypes.object
}

export default BooleanFields
