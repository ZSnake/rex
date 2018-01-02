import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
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
}, {
  path: '/',
  component: Home,
}];

const App = () => (<div className="App">
  {window.location.pathname !== '/' ? (<Navbar></Navbar>) : ''}
  {routes.map(route => (<Route exact key={route.path} path={route.path} component={route.component}></Route>))}
</div>);

export default App;
