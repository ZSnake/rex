import React from 'react';
import logo from '../imgs/logo.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { logout } from '../redux/authentication/actions';

const navStyle = {
  "marginBottom": 0
};

const Navbar = ({user, logout}) =>
  (
    <nav id="navbar" className="ui massive menu inverted" style={navStyle}>
      <Link to="/">
        <div id="logo" className="header item">
          <img className="logo-img" src={logo} alt="logo"/>
        </div>
      </Link>
      <div className="right menu">
        {!isEmpty(user) ?
        <Link className="item" to="/addresses">Addresses</Link> :
        ''}
        {!isEmpty(user) ?
        <Link className="item" to="/menu">Menu</Link> :
        ''}
        {!isEmpty(user) ?
        <Link className="item" to="/ingredients">Ingredientes</Link> :
        ''}
        {!isEmpty(user) ?
        <Link className="item" to="/dishes">Dishes</Link> :
        ''}
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
