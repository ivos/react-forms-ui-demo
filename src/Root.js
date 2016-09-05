import React from 'react'
import {Provider} from 'react-redux'
import AppRouter from './router';

const Root = ({store, history, locale}) => (
	<Provider store={store}>
		<AppRouter history={history} locale={locale}/>
	</Provider>
)

export default Root
