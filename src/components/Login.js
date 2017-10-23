import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/authentication/actions';

const Login = ({ error, login }) => {
  let emailInput;
  let passwordInput
  return (
      <div>
          <input
              type="text"
              ref={node => { emailInput = node }}/>
          <input
              ref={node => { passwordInput = node }}
              type="password"/>
          <button onClick={() => login({ email: emailInput.value, password: passwordInput.value })}>Login</button>
          <h4>{error}</h4>
      </div>
  );
}

Login.displayName = 'Login'
Login.propTypes = {
  error: PropTypes.string,
  login: PropTypes.func.isRequired
}

const mapStateToProps = ({ authentication }) => ({
  error: authentication.error
});

const mapDispatchToProps = dispatch => ({
  login: credentials => {
    dispatch(login(credentials));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);