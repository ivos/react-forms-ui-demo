import React from 'react'
import {withRouter} from 'react-router'
import ReactDOM from 'react-dom'
import {setTitle, focusFirst} from '../ui/utils'
import {Form, TextField} from 'react-forms-ui'
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
import {LinkCreate} from '../ui/buttons'
import {list} from '../api'

const CompanyList = React.createClass({

	getInitialState() {
		return {
			changed: false,
			data: [],
			values: {}
		}
	},

	render() {
		const {data, changed} = this.state
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		return (
			<Form ref="form" state={this.state} setState={this.setState.bind(this)} onChange={this.onChange}
			      onSubmit={this.onSubmit}>
				{this._reloaded && !changed && !data.length &&
				<div className="alert alert-info">
					<p><strong>You have no company defined now.</strong></p>

					<p>Create your first company to start working with it.</p>
				</div>
				}
				{this._reloaded && (changed || data.length > 0) &&
				<Panel header={<h3>
					Companies <span className="badge pull-right">{data.length}</span>
				</h3>}>

					<TextField id="name" label="Name" classes={fieldClasses}/>

					<ListGroup fill>
						{data.map(function (model, index) {
							return (
								<ListGroupItem key={model.id} href={'#companies/' + model.id}
								               className="list-group-item">{model.name}</ListGroupItem>
							)
						})}
					</ListGroup>
				</Panel>
				}
				{<LinkCreate href="#companies/new" title="Create new company."/>}
			</Form>
		)
	},

	reload(changed) {
		const {values} = this.state
		changed = changed || false
		list('companies', values).then(data => {
				this._reloaded = true
				this.setState({data, changed}, function () {
					focusFirst(ReactDOM.findDOMNode(this.refs.form))
				})
			}
		)
	},

	componentDidMount() {
		setTitle('Companies')
		this.reload()
	},

	onChange() {
		this.reload(true)
	},

	onSubmit() {
		const {router} = this.props
		const {data} = this.state
		router.push('/companies/' + data[0].id)
	},

})

export default withRouter(CompanyList)
