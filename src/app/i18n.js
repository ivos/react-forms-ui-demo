import i18n from 'i18next/lib/index';
import {I18nEn, I18nCs} from 'react-forms-ui';
import enApp from './i18n/en';
import csApp from './i18n/cs';

var resources = {
	en: Object.assign({}, I18nEn, enApp),
	cs: Object.assign({}, I18nCs, csApp)
};

i18n.init({
	defaultNS: 'label',
	lngWhitelist: ['en', 'cs'],
	fallbackLng: 'en',
	resources: resources
});

export default i18n;
