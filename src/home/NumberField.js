import React, {Component} from 'react'
import {FormControl} from 'react-bootstrap'
import {Field, wrap} from './Field'
import numeral from 'numeral'

const defaultFormat = '0,0.[00]'

const formatDisplay = customFormat => value => {
	return ('' !== value) ? numeral(value).format(customFormat) : ''
}
const parse = value => {
	return ('' !== value) ? numeral().unformat(value) : null
}

class NumberField_ extends Component {
	constructor(props) {
		super(props)
		this.state = {localValue: null}
		this.formatEventValue = this.formatEventValue.bind(this)
		const {input: {onChange, onBlur}} = props
		this.handleChange = this.handleChange.bind(this)
		this.wrappedOnChange = onChange
		this.handleBlur = this.handleBlur.bind(this)
		this.wrappedOnBlur = onBlur
	}

	formatEventValue(event) {
		const {customFormat} = this.props
		const {target: {value}} = event
		return formatDisplay(customFormat)(value)
	}

	handleChange(event) {
		const {target: {value}} = event
		this.setState({localValue: value})
		this.wrappedOnChange(this.formatEventValue(event))
	}

	handleBlur(event) {
		this.setState({localValue: null})
		this.wrappedOnBlur(this.formatEventValue(event))
	}

	render() {
		const {customFormat, input} = this.props
		const {localValue} = this.state
		const value = (null !== localValue) ? localValue : formatDisplay(customFormat)(input.value)
		const customProps = Object.assign({}, this.props)
		customProps.input = Object.assign({}, input, {
			onChange: this.handleChange,
			onBlur: this.handleBlur,
			value,
		})
		return (
			<Field {...customProps} component={FormControl} componentProps={{
				placeholder: customProps.label,
				autoComplete: 'off',
				className: 'text-right',
			}} showFeedback={false}/>
		)
	}
}

export const NumberField = (props) => {
	const customFormat = props.format || defaultFormat
	const customProps = {...props, customFormat}
	delete customProps.format
	return wrap(NumberField_, Object.assign({parse}, customProps))
}

// TODO:
const NumberDisplay_ = ({input: {value}}) => (
	<span>{formatDisplay('   todo   ')(value)}</span>
)

export const NumberDisplay = (props) => wrap(NumberDisplay_, props)
