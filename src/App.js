import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Login from './components/Login';

const routes = [{
  path: '/login',
  component: Login
}];

const App = () => <div className="App">
  <nav>
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
  </nav>
  <Route exact={true} path="/" component={() => (<div><h1>Home</h1></div>)}></Route>
  {routes.map(route => (<Route key={route.toString()} path={route.path} component={route.component}></Route>))}
</div>;

export default App;
