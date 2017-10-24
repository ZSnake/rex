import React from 'react';
import './App.css';
import logo from './imgs/logo.png';
import { Route, Link } from 'react-router-dom';
import Login from './components/Login';

const routes = [{
  path: '/login',
  component: Login
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
  {routes.map(route => (<Route key={route.toString()} path={route.path} component={route.component}></Route>))}
</div>;

export default App;
