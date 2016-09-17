import React from 'react'
import {emptyToNull} from '../ui/utils'
import {FormMixin, Panel, Form, DateRangeField, FormMessages} from 'react-forms-ui'
import {ButtonSave} from '../ui/buttons'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

const DateRangeFields = React.createClass({

	mixins: [FormMixin],

	validations: {
		drFreeFrom: {},
		drFreeTo: {},
		drReqFrom: {
			required: true
		},
		drReqTo: {
			required: true
		},
		drValueFrom: {},
		drValueTo: {},
		drFromReqFrom: {
			required: true
		},
		drFromReqTo: {},
		drToReqFrom: {},
		drToReqTo: {
			required: true
		}
	},

	render() {
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.daterange.title')}>
					<DateRangeField ref="drFree" id="drFree" label={t('home.daterange.drFree')}
					                classes={fieldClasses}/>
					<DateRangeField ref="drReq" id="drReq" label={t('home.daterange.drReq.label')}
					                placeholderFrom={t('home.daterange.drReq.placeholderFrom')}
					                placeholderTo={t('home.daterange.drReq.placeholderTo')} classes={fieldClasses}
					                required/>
					<DateRangeField ref="drValue" id="drValue" label={t('home.daterange.drValue')}
					                classes={fieldClasses}/>
					<DateRangeField ref="drFromReq" id="drFromReq" label={t('home.daterange.drFromReq')}
					                classes={fieldClasses} required/>
					<DateRangeField ref="drToReq" id="drToReq" label={t('home.daterange.drToReq')}
					                classes={fieldClasses} required/>
					<DateRangeField ref="drRO" id="drRO" label={t('home.daterange.drRO')} classes={fieldClasses}
					                readonly/>
					<DateRangeField ref="drROEmpty" id="drROEmpty" label={t('home.daterange.drROEmpty')}
					                classes={fieldClasses} readonly/>
					<DateRangeField ref="drROFromEmpty" id="drROFromEmpty" label={t('home.daterange.drROFromEmpty')}
					                classes={fieldClasses} readonly/>
					<DateRangeField ref="drROToEmpty" id="drROToEmpty" label={t('home.daterange.drROToEmpty')}
					                classes={fieldClasses} readonly/>

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

DateRangeFields.childContextTypes = {
	form: React.PropTypes.object
}

export default DateRangeFields
