import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import { login } from '../redux/authentication/actions';
import fullLogo from '../imgs/THK-Dark.png';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

const Login = ({ error, login, loading, user }) => {
  let emailInput = '';
  let passwordInput= '';
  return (
    user.token ? (
        <Redirect to="/" />
      ) : (
      <div id="login-container" className={classNames('ui raised very padded text container segment inverted', { 'loading': loading })}>
        <div className="full-logo-container">
          <img src={fullLogo} alt="The Health Kitchen"/>
        </div>
        <div id="login-form" className="ui form">
          <div className="fields">
            <div className="two wide field"></div>
            <div className="twelve wide field">
              <label className="content">Email: </label>
              <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  ref={node => { emailInput = node }}/>
            </div>
          </div>
          <div className="fields">
            <div className="two wide field"></div>
            <div className="twelve wide field">
              <label className="content">Password: </label>
              <input
                  ref={node => { passwordInput = node }}
                  placeholder="Password"
                  name="password"
                  type="password"/>
            </div>
          </div>
          <div id="loginRegister" className="fields login-register-container">
            <div className="six wide field"></div>
            <div className="ui buttons">
              <button className="ui button" onClick={() => login({ email: emailInput.value, password: passwordInput.value })}>Login</button>
              <div className="or"></div>
              <button className="ui positive button">Register</button>
            </div>
          </div>
          <h4>{error}</h4>
        </div>
      </div>
    )
  );
}

Login.displayName = 'Login'
Login.propTypes = {
  error: PropTypes.string,
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object
}

const mapStateToProps = ({ authentication }) => ({
  error: authentication.error,
  loading: authentication.loading,
  user: isEmpty(authentication.user) ? (JSON.parse(sessionStorage.getItem('user')) || {}) : authentication.user
});

const mapDispatchToProps = dispatch => ({
  login: credentials => {
    dispatch(login(credentials));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);