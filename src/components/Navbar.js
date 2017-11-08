import React from 'react';
import logo from '../imgs/logo.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { logout } from '../redux/authentication/actions';

const Navbar = ({user, logout}) =>
  (
    <nav id="navbar" className="ui massive menu inverted">
    <div id="logo" className="header item">
      <img className="logo-img" src={logo} alt="logo"/>
    </div>
    <div className="right menu">
      <Link className="item" to="/">Home</Link>
      {isEmpty(user) ?
      <Link className="item" to="/login">Login</Link> :
      <a className="item" onClick={e => {e.preventDefault(); logout()}}>Logout</a>}
    </div>
    </nav>
  );


const mapStateToProps = ({ authentication }) => ({
  user: authentication.user
});


const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);