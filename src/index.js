import React from 'react'
import ReactDOM from 'react-dom'
import {useRouterHistory} from 'react-router'
import {createHashHistory} from 'history'
import AppRouter from './router'
import i18n from './i18n'
import {initialize, ReactFormsUiOptions} from 'react-forms-ui'
import numeral from 'numeral'
import numeralCs from 'numeral/languages/cs'
numeral.language('cs', numeralCs)
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'select2/select2.css'
import 'react-forms-ui/lib/react-forms-ui.css'
import './index.css'

initialize()
import moment from 'moment'

ReactFormsUiOptions.translate = i18n.t.bind(i18n)

var supportedLocales = ['en', 'cs']
var locale = navigator.language.substr(0, 2)
if (supportedLocales.indexOf(locale) === -1) {
	locale = 'en'
}

moment.locale(locale)

const history = useRouterHistory(createHashHistory)({queryKey: false})

numeral.language(locale)
i18n.changeLanguage(locale, function () {
	ReactDOM.render(<AppRouter history={history} locale={locale}/>, document.getElementById('app-content'))
})
