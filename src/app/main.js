import 'babel-core/polyfill';
import $ from 'jquery';
import AppRouter from './router';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createHashHistory';
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
var history = createHistory({
	queryKey: false
});

numeral.language(locale);
i18n.changeLanguage(locale, function () {
	ReactDOM.render(<AppRouter history={history} locale={locale}/>, document.getElementById('app-content'));
});
