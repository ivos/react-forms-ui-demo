import React from 'react'
import ReactDOM from 'react-dom'
import {SystemMessage} from 'react-forms-ui'
import AppRouter from '../router'
import Header from './header'
import Footer from './footer'
import i18n from '../i18n'
import numeral from 'numeral'
import moment from 'moment'

const App = React.createClass({

	getInitialState() {
		return {}
	},

	getChildContext() {
		return {
			setSystemMessage: (systemMessage) => {
				const {msg} = this.refs
				this.setState({systemMessage}, () => {
					if (msg) {
						msg.restore()
					}
				})
			}
		}
	},

	render() {
		const {location: {pathname}, locale} = this.props
		const {systemMessage} = this.state
		const active = pathname.split('/')[1] || 'home'
		return (
			<div>
				<Header active={active} locale={locale} onLocaleChange={this.setLocale}/>
				<SystemMessage ref="msg" message={systemMessage}/>

				<div>{this.props.children}</div>
				<Footer/>
			</div>
		)
	},

	setLocale(locale){
		numeral.language(locale)
		i18n.changeLanguage(locale, function () {
			const {history} = this.props
			moment.locale(locale)
			ReactDOM.render(<AppRouter history={history} locale={locale}/>, document.getElementById('app-content'))
		}.bind(this))
	},
})

App.childContextTypes = {
	setSystemMessage: React.PropTypes.func,
}

export default App
