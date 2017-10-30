import React, {Component} from 'react';
import './App.css';
import logo from './imgs/logo.png';
import { Route, Link } from 'react-router-dom';
import Login from './components/Login';
import { connect } from 'react-redux';
import { fetchUser, logout } from './redux/authentication/actions';
import isEmpty from 'lodash/isEmpty';

const routes = [{
  path: '/login',
  component: Login
}];

class App extends Component {
  constructor(props){
    super();
    this.props = props;
  };
  componentDidMount = () => {
    this.props.fetchUser();
  };
  render() {
    return (<div className="App">
      <nav id="navbar" className="ui massive menu inverted">
        <div id="logo" className="header item">
          <img className="logo-img" src={logo} alt="logo"/>
        </div>
        <div className="right menu">
          <Link className="item" to="/">Home</Link>
          <Link className="item" to="/login">Login</Link>
        </div>
      </nav>
      <Route exact={true} path="/" component={() => (<div><h1 className="main-header">Home</h1></div>)}></Route>
      {routes.map(route => (<Route key={route.toString()} exact={true} path={route.path} component={route.component}></Route>))}
    </div>);
  }
};

const mapStateToProps = ({ authentication }) => ({
  user: authentication.user
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => {
    dispatch(fetchUser());
  },
  logout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
