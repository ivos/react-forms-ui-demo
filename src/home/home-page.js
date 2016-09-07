import React from 'react';
import {setTitle} from '../ui/utils';
import TextFields from './text-fields';
import PasswordFields from './password-fields';
import NumberFields from './number-fields';
import SelectFields from './select-fields';
import DateFields from './date-fields';
import DateRangeFields from './date-range-fields';
import BooleanFields from './boolean-fields';
import TableForm from './table-form';
import FormDemoWrapper from './FormDemoWrapper'
import i18n from '../i18n';
var t = i18n.t.bind(i18n);
import {Grid, Row, Col} from 'react-bootstrap'

export default React.createClass({

	render() {
		return (
			<Grid fluid>
				<h2>React Forms UI</h2>

				<FormDemoWrapper name="TextFields">
					<TextFields ref="first"/>
				</FormDemoWrapper>
				<FormDemoWrapper name="PasswordFields">
					<PasswordFields/>
				</FormDemoWrapper>
				{/*<NumberFields/>*/}
				{/*<SelectFields/>*/}
				{/*<DateFields/>*/}
				{/*<DateRangeFields/>*/}
				{/*<BooleanFields/>*/}
				<FormDemoWrapper name="TableForm">
					<TableForm/>
				</FormDemoWrapper>

			</Grid>
		);
	},

	componentDidMount() {
		setTitle(t('home.title'));
		// this.refs.first.focus()
	}

});
