import React from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import flagCs from '../img/flag-cs.jpg'
import flagEn from '../img/flag-en.jpg'

export default React.createClass({

	render() {
		const {active, locale} = this.props
		const localeLabels = {
			en: <span><img src={flagEn} height="14" width="23" alt="English"/> English</span>,
			cs: <span><img src={flagCs} height="14" width="21" alt="Česky"/> Česky</span>
		}
		const currentLocaleLabel = localeLabels[locale]
		return (
			<Navbar fixedTop fluid>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="/app/#">React Forms UI</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<NavItem eventKey={1} href="#home" active={('home' === active)}>Home</NavItem>
						<NavItem eventKey={2} href="#companies" active={('companies' === active)}>Companies</NavItem>
						<NavItem eventKey={3} href="#partners" active={('partners' === active)}>Partners</NavItem>
					</Nav>
					<Nav pullRight>
						<NavDropdown eventKey={4} title={currentLocaleLabel} id="basic-nav-dropdown">
							{'en' !== locale &&
							<MenuItem eventKey={4.1} onClick={this.setLocaleEn}>
								{localeLabels.en}
							</MenuItem>
							}
							{'cs' !== locale &&
							<MenuItem eventKey={4.1} onClick={this.setLocaleCs}>
								{localeLabels.cs}
							</MenuItem>
							}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	},

	setLocaleEn(event){
		event.preventDefault()
		const {onLocaleChange} = this.props
		onLocaleChange('en')
	},

	setLocaleCs(event){
		event.preventDefault()
		const {onLocaleChange} = this.props
		onLocaleChange('cs')
	}

})
