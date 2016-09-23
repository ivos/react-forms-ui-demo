import React from 'react'
import {Button} from 'react-bootstrap'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

export const ButtonSave = React.createClass({
	render() {
		return (
			<Button type="submit" bsStyle="primary" title="Alt+Shift+S">
				<span className="fa fa-check"> </span> {t('button.save')}
			</Button>
		)
	}
})

export const LinkBack = React.createClass({
	render() {
		return (
			<Button bsStyle="link" className="pull-right" style={{marginRight: 50}} {...this.props}><span
				className="fa fa-chevron-left"> </span> Back
			</Button>
		)
	}
})

export const LinkCreate = React.createClass({
	render() {
		return (
			<Button {...this.props}>
				<span className="fa fa-plus"> </span> Create
			</Button>
		)
	}
})

export const LinkEdit = React.createClass({
	render() {
		return (
			<Button {...this.props}>
				<span className="fa fa-pencil-square-o"> </span> Edit
			</Button>
		)
	}
})
