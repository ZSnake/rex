import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { Register } from './components/register';
import { CreateUser } from './components/user';
import { CreateIngredient } from './components/createIngredients';
import { Ingredients } from './components/listIngredients';

const routes = [{
  path: '/login',
  component: Login
}, {
  path: '/register',
  component: Register
}, {
  path: '/createuser',
  component: CreateUser
}, {
  path: '/createingredient',
  component: CreateIngredient
}, {
  path: '/ingredients',
  component: Ingredients
}];

const App = () => <div className="App">
  <Navbar></Navbar>
  <Route exact={true} path="/" component={() => (<div><h1 className="main-header">Home</h1></div>)}></Route>
  {routes.map(route => (<Route key={route.path} path={route.path} component={route.component}></Route>))}
</div>;

export default App;
