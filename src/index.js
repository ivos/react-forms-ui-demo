import React from 'react';
import ReactDOM from 'react-dom';
import {useRouterHistory} from 'react-router';
import {createHashHistory} from 'history'
import Root from './Root';
import i18n from './i18n';
import {ReactFormsUiOptions} from 'react-forms-ui';
import numeral from 'numeral';
import numeralCs from 'numeral/languages/cs';
numeral.language('cs', numeralCs);
import moment from 'moment'
import reactWidgetsLocalizer from 'react-widgets/lib/localizers/moment'
reactWidgetsLocalizer(moment)
import configureStore from './store'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-widgets/dist/css/react-widgets.css'
import 'react-forms-ui/lib/react-forms-ui.css'
import './typeahead.css'
import './index.css'

ReactFormsUiOptions.translate = i18n.t.bind(i18n)

var supportedLocales = ['en', 'cs']
var locale = navigator.language.substr(0, 2)
if (supportedLocales.indexOf(locale) === -1) {
	locale = 'en'
}

moment.locale(locale)

const store = configureStore()

const history = useRouterHistory(createHashHistory)({queryKey: false})

numeral.language(locale)
i18n.changeLanguage(locale, function () {
	ReactDOM.render(
		<Root store={store} history={history} locale={locale}/>,
		document.getElementById('app-content'))
})
