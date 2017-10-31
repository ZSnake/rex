import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import fullLogo from '../../imgs/THK-Dark.png';
require('./register.css');

const Register = () => {
	let emailInput;
	let passwordInput;
	let confirmPasswordInput;
	let firstNameInput;
	let lastNameInput;

	return (<div className="ui one column grid RegisterForm">
		<div className="row">
		 	<div id="login-container" className="ui raised very padded text container segment">
				<div className="six wide centered column RegisterForm-form">
					<div className="full-logo-container"><img src={fullLogo} alt="The Health Kitchen"/></div>
					<div className="ui form">
						<div className="field">
							<label className="RegisterForm-label"> Email </label>
							<input type="text" placeholder="Enter email" ref={node => { emailInput = node }} />
						</div>
						<div className="two fields">
							<div className="field">
								<label className="RegisterForm-label"> Password </label>
								<input type="password" placeholder="Enter password" ref={node => { passwordInput = node }} />
							</div>
							<div className="field">
								<label className="RegisterForm-label"> Confirm Password </label>
								<input type="password" placeholder="Confirm password" ref={node => { confirmPasswordInput = node }} />
							</div>
						</div>
						<div className="two fields">
							<div className="field">
								<label className="RegisterForm-label"> First Name </label>
								<input type="text" placeholder="Enter first name" ref={node => { firstNameInput = node }} />
							</div>
							<div className="field">
								<label className="RegisterForm-label"> Last Name </label>
								<input type="text" placeholder="Enter last name" ref={node => { lastNameInput = node }} />
							</div>
						</div>
						<button className="ui fluid button" onClick={() => true}>Register</button>
					</div>
				</div>
		 	</div>
		</div>
	</div>);
};

export default Register;