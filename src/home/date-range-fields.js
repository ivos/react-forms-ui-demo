import React from 'react'
import {emptyToNull} from '../ui/utils'
import {Panel, Form, DateRangeField, FormMessages} from 'react-forms-ui'
import {ButtonSave} from '../ui/buttons'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

const validations = {
	drFreeFrom: {},
	drFreeTo: {},
	drReqFrom: {
		required: true,
	},
	drReqTo: {
		required: true,
	},
	drValueFrom: {},
	drValueTo: {},
	drFromReqFrom: {
		required: true,
	},
	drFromReqTo: {},
	drToReqFrom: {},
	drToReqTo: {
		required: true,
	}
}

const DateRangeFields = React.createClass({

	getInitialState() {
		return {}
	},

	render() {
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form state={this.state} setState={this.setState.bind(this)} validations={validations}
			      onSubmit={this.onSubmit}>
				<Panel content="panel-body" title={t('home.daterange.title')}>
					<DateRangeField id="drFree" label={t('home.daterange.drFree')} classes={fieldClasses}/>
					<DateRangeField id="drReq" label={t('home.daterange.drReq.label')}
					                placeholderFrom={t('home.daterange.drReq.placeholderFrom')}
					                placeholderTo={t('home.daterange.drReq.placeholderTo')} classes={fieldClasses}/>
					<DateRangeField id="drValue" label={t('home.daterange.drValue')} classes={fieldClasses}/>
					<DateRangeField id="drFromReq" label={t('home.daterange.drFromReq')} classes={fieldClasses}/>
					<DateRangeField id="drToReq" label={t('home.daterange.drToReq')} classes={fieldClasses}/>
					<DateRangeField id="drRO" label={t('home.daterange.drRO')} classes={fieldClasses} readonly/>
					<DateRangeField id="drROEmpty" label={t('home.daterange.drROEmpty')} classes={fieldClasses}
					                readonly/>
					<DateRangeField id="drROFromEmpty" label={t('home.daterange.drROFromEmpty')} classes={fieldClasses}
					                readonly/>
					<DateRangeField id="drROToEmpty" label={t('home.daterange.drROToEmpty')} classes={fieldClasses}
					                readonly/>

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
				drValueFrom: '2015-10-20',
				drValueTo: '2015-10-25',
				drROFrom: '2015-10-22',
				drROTo: '2015-10-23',
				drROEmptyFrom: null,
				drROEmptyTo: null,
				drROFromEmptyFrom: null,
				drROFromEmptyTo: '2015-10-24',
				drROToEmptyFrom: '2015-10-26',
				drROToEmptyTo: null
			}
		})
	},

	onSubmit() {
		const {values} = this.state
		alert(t('home.sent') + `:\n\n${JSON.stringify(values, null, 2)}`)
		console.log(t('home.sent'), values)
	},

})

export default DateRangeFields
