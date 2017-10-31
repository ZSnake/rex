import React from 'react';
import './App.css';
import logo from './imgs/logo.png';
import { Route, Link } from 'react-router-dom';
import Login from './components/Login';
import { Register } from './components/register';
import { CreateUser } from './components/user';

const routes = [{
  path: '/login',
  component: Login
}, {
  path: '/register',
  component: Register
}, {
  path: '/createUser',
  component: CreateUser
}];

const App = () => <div className="App">
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
  {routes.map(route => (<Route key={route.path} path={route.path} component={route.component}></Route>))}
</div>;

export default App;
