import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
const routes = [{
  path: '/login',
  component: Login
}];

const App = () => <div className="App">
  <Navbar></Navbar>
  <Route exact={true} path="/" component={() => (<div><h1 className="main-header">Home</h1></div>)}></Route>
  {routes.map(route => (<Route key={route.toString()} path={route.path} component={route.component}></Route>))}
</div>;

export default App;
