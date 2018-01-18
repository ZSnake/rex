import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Register } from './components/register';
import { CreateUser } from './components/user';
import { CreateDish } from './components/createDishes';
import { CreateIngredient } from './components/createIngredients';
import { Ingredients } from './components/listIngredients';
import { Dishes } from './components/listDishes';
import { Menu } from './components/menu';
import { Addresses } from './components/listAddresses';
import { CreateAddress } from './components/createAddresses';


const routes = [{
  path: '/login',
  component: Login
}, {
  path: '/register',
  component: Register
}, {
  path: '/createuser',
  component: CreateUser
},{
  path: '/addresses',
  component: Addresses
}, {
  path: '/createdish',
  component: CreateDish
}, {
  path: '/createingredient',
  component: CreateIngredient
}, {
  path: '/createaddress',
  component: CreateAddress
}, {
  path: '/ingredients',
  component: Ingredients
}, {
  path: '/dishes',
  component: Dishes
}, {
  path: '/menu',
  component: Menu,
}, {
  path: '/',
  component: Home,
}];

const App = () => (<div className="App">
  <Navbar></Navbar>
  {routes.map(route => (<Route key={route.path} path={route.path} component={route.component}></Route>))}
</div>);

export default App;
