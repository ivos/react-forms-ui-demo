import React from 'react'
import {connect} from 'react-redux'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

const FormDemoWrapper = ({children, values}) => (
	<div>
		{children}
		{t('home.values')}
		<pre>{values}</pre>
	</div>
)

const mapStateToProps = (state, ownProps) => {
	const formState = state.form[ownProps.name]
	const values = (formState && undefined !== formState.values) ?
		JSON.stringify(formState.values, null, 2) : 'undefined'
	return {values}
}

export default connect(mapStateToProps)(FormDemoWrapper)
