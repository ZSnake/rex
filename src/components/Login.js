import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/authentication/actions';

class Login extends Component {
  constructor(props){
    super();
    this.props = props;
    this.state = {
      email: '',
      password: ''
    }
    this.loginOnClick = this.loginOnClick.bind(this);
  }
  loginOnClick(evt){
    evt.preventDefault();
    this.props.login({email: this.state.email, password: this.state.password});
  }
  componentDidUpdate(previousProps){
    if(previousProps.authentication.user !== this.props.authentication.user){
      sessionStorage.setItem('user', JSON.stringify(this.props.authentication.user));
    }
  }
  render(){
    return (
      <div>
        <h1>{this.state.email + ' -- ' + this.state.password}</h1>
        <div>
          <form>
            <input type="text"
                ref="email"
                value={this.state.email}
                onChange={evt => this.setState({ email: evt.target.value })}/>
            <input ref="password"
                type="password"
                value={this.state.password}
                onChange={evt => this.setState({password: evt.target.value})} />
            <button onClick={this.loginOnClick}>Login</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);