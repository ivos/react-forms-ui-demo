import 'babel-core/polyfill';
import $ from 'jquery';
import AppRouter from './router';
import React from 'react';
import ReactDOM from 'react-dom';
import {useRouterHistory} from 'react-router';
import {createHashHistory} from 'history'
import i18n from './i18n';
import {ReactFormsUiOptions} from 'react-forms-ui';
import numeral from 'numeral';
import numeralCs from 'numeral/languages/cs';
numeral.language('cs', numeralCs);
require('react-forms-ui/lib/react-forms-ui.css');

ReactFormsUiOptions.translate = i18n.t.bind(i18n);

var supportedLocales = ['en', 'cs'];
var locale = navigator.language.substr(0, 2);
if (supportedLocales.indexOf(locale) === -1) {
	locale = 'en';
}

moment.locale(locale);

// Opt-out of persistent state
const appHistory = useRouterHistory(createHashHistory)({queryKey: false});

numeral.language(locale);
i18n.changeLanguage(locale, function () {
	ReactDOM.render(<AppRouter history={appHistory} locale={locale}/>, document.getElementById('app-content'));
});
