import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import fullLogo from '../../imgs/THK-Dark.png';
import authService from '../../services/authentication';
import * as types from '../../redux/authentication/types';
import classNames from 'classnames';
require('./createUser.css');

const PASSWORD_MISMATCH_ERROR = 'Passwords don\'t match. Please try again.';
const UNKNOWN_ERROR = 'Unknown error. Please try again.'

const passwordsMatch = (password, confirmPassword) => password === confirmPassword
const createUser = (email, password, confirmPassword, firstName, lastName, type, { showLoading, clearLoading, setError, history }) => {
	if (password.trim() === '' || confirmPassword.trim() === '' || !passwordsMatch(password, confirmPassword)) {
		return setError(PASSWORD_MISMATCH_ERROR);
	}
	const name = `${firstName.trim()} ${lastName.trim()}`;
	showLoading();
	authService.registerUser({ email, password, name, type })
		.then(response => response.json())
		.then(response => {
			clearLoading();
		})
		.catch(() => {
			clearLoading();
			setError(UNKNOWN_ERROR);
		});
}

const CreateUser = props => {
	let emailInput;
	let passwordInput;
	let confirmPasswordInput;
	let firstNameInput;
	let lastNameInput;
	let menuInput;

	return (<div className="ui one column grid CreateUserForm">
		<div className="row">
		 	<div id="login-container" className={classNames('ui raised very padded text container segment', { 'loading': props.loading })}>
				<div className="six wide centered column CreateUserForm-form">
					<div className="full-logo-container"><img src={fullLogo} alt="The Health Kitchen"/></div>
					<div className="ui form">
						<div className="field">
							<label className="CreateUserForm-label"> Email </label>
							<input type="text" placeholder="Enter email" ref={node => { emailInput = node }} />
						</div>
						<div className="two fields">
							<div className="field">
								<label className="CreateUserForm-label"> Password </label>
								<input type="password" placeholder="Enter password" ref={node => { passwordInput = node }} />
							</div>
							<div className="field">
								<label className="CreateUserForm-label"> Confirm Password </label>
								<input type="password" placeholder="Confirm password" ref={node => { confirmPasswordInput = node }} />
							</div>
						</div>
						<div className="three fields">
							<div className="field">
								<label className="CreateUserForm-label"> First Name </label>
								<input type="text" placeholder="Enter first name" ref={node => { firstNameInput = node }} />
							</div>
							<div className="field">
								<label className="CreateUserForm-label"> Last Name </label>
								<input type="text" placeholder="Enter last name" ref={node => { lastNameInput = node }} />
							</div>
							<div className="field">
								<label className="CreateUserForm-label"> Type </label>
								<select id = "dropdown" ref = {node => menuInput = node}>
								    <option value="admin">Admin</option>
								    <option value="customer">Customer</option>
								</select>
							</div>
						</div>
						<button className="ui fluid button"
							onClick={() => createUser(emailInput.value, passwordInput.value, confirmPasswordInput.value, firstNameInput.value, lastNameInput.value, menuInput.value, props)}>Create User</button>
						<h4>{props.error}</h4>
					</div>
				</div>
		 	</div>
		</div>
	</div>);
};

CreateUser.displayName = 'CreateUser';
CreateUser.propTypes = {
	loading: PropTypes.bool,
	error: PropTypes.string,
	showLoading: PropTypes.func,
	clearLoading: PropTypes.func,
	setError: PropTypes.func
};

const mapStateToProps = ({ authentication }) => ({
	error: authentication.error,
	loading: authentication.loading
});

const mapDispatchToProps = dispatch => ({
	showLoading: () => dispatch({ type: types.SHOW_LOADING }),
	clearLoading: () => dispatch({ type: types.CLEAR_LOADING }),
	setError: error => dispatch({ type: types.SET_ERROR, error })
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);