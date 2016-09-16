import React, {Component} from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import {Field, wrap} from './Field'

const formatDisplay = labelField => item => item[labelField]

const formatSelectItem = (valueField, labelField) => (item) => ({
	value: item[valueField],
	label: item[labelField],
})

class SelectField_ extends Component {
	constructor(props) {
		super(props)
		this.state = {data: null}
		this.loadOptions = this.loadOptions.bind(this)
		const {input: {onChange}} = props
		this.handleChange = this.handleChange.bind(this)
		this.wrappedOnChange = onChange
	}

	loadOptions(query) {
		const {load, valueField, labelField} = this.props
		let data = load(query)
		if (Array.isArray(data)) {
			data = Promise.resolve(data)
		}
		return data
			.then(data => {
				this.setState({data})
				return data
			})
			.then(data => data.map(formatSelectItem(valueField, labelField)))
			.then(data => ({options: data}))
	}

	findDataItem() {
		const {valueField} = this.props
		const {data} = this.state
		return value ? data.find(item => value === item[valueField]) : null
	}

	handleChange(selectItem) {
		const {valueField} = this.props
		const {data} = this.state
		const value = (selectItem && (null != selectItem.value)) ? selectItem.value : null
		const dataItem = (null === value) ? null : data.find(item => value === item[valueField])
		this.wrappedOnChange(dataItem)
	}

	render() {
		const {readonly, placeholder, label, valueField, labelField, disabled, input: {value}} = this.props
		const selectItem = formatSelectItem(valueField, labelField)(value)
		if (readonly) {
			this.props.input.value = formatDisplay(labelField)(value)
		}
		return (
			<Field {...this.props} component={Select.Async} componentProps={{
				placeholder: placeholder || label,
				loadOptions: this.loadOptions,
				onChange: this.handleChange,
				onBlur: () => null,
				value: selectItem,
				cache: false,
				disabled,
			}} showFeedback={false}/>
		)
	}
}

export const SelectField = (props) => wrap(SelectField_, props)

SelectField.propTypes = {
	id: React.PropTypes.string.isRequired,
	name: React.PropTypes.string,
	label: React.PropTypes.string,
	placeholder: React.PropTypes.string,
	classes: React.PropTypes.string.isRequired,
	readonly: React.PropTypes.bool,
	load: React.PropTypes.func,
	valueField: React.PropTypes.string,
	labelField: React.PropTypes.string,
}

const SelectDisplay_ = ({input: {value}}) => (
	<span>{value}</span>
)

export const SelectDisplay = (props) => wrap(SelectDisplay_, props)

SelectDisplay_.propTypes = {
	id: React.PropTypes.string.isRequired,
}
