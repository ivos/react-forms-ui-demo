import React from 'react';
import i18n from '../i18n';
var t = i18n.t.bind(i18n);

export var ButtonSave = React.createClass({
	render() {
		return (
			<button type="submit" className="btn btn-primary" title="Alt+Shift+S">
				<span className="fa fa-check"> </span> {t('button.save')}
			</button>
		);
	}
});

export var LinkBack = React.createClass({
	render() {
		return (
			<a className="pull-right" style={{marginRight: 50}} {...this.props}><span
				className="fa fa-chevron-left"> </span> Back
			</a>
		);
	}
});

export var LinkCreate = React.createClass({
	render() {
		return (
			<a className="btn btn-default"  {...this.props}>
				<span className="fa fa-plus"> </span> Create
			</a>
		);
	}
});

export var LinkEdit = React.createClass({
	render() {
		return (
			<a className="btn btn-default"  {...this.props}>
				<span className="fa fa-pencil-square-o"> </span> Edit
			</a>
		);
	}
});
