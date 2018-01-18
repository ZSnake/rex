import React from 'react';
import classNames from 'classnames';
import { Redirect } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import * as types from '../../redux/dish/types';
import ingredientService from '../../services/dishes';

require('./createDish.css');

const saveDish = (ingredient, {createDishSuccess, createDishFailure,
  createDishRequest, user, history}) => {
    createDishRequest();
    return ingredientService.createDish(user.token, ingredient)
    .then(response => response.json())
    .then(result => {
      createDishSuccess(result);
      history.push('/dishes');
    })
    .catch(error => createDishFailure(error));
};

class CreateDish extends React.Component {
  render() {
    let name, description;
    if(isEmpty(this.props.user)){
      return <Redirect to="/" />
    }
    return (<div className="ui one column grid CreateIngredientForm">
    <div className = "row" > <div className={classNames('ui raised very padded text container segment CreateIngredientForm-segment', {'loading': this.props.loading})}>
      <div className="six wide centered column CreateIngredientForm-form">
        <h2 className="ui white center aligned header CreateIngredientForm-form--white">Create
        </h2>
        <div className="ui form">
          <div className="two fields">
            <div className="field">
              <label className="CreateIngredientForm-label">
                Name
              </label>
              <input type="text" ref={node => {
                  name = node
                }} placeholder="Enter Name"/>
            </div>
            <div className="field">
              <label className="CreateIngredientForm-label">
                Description
              </label>
              <textarea rows="4" ref={node => {
                  description = node
                }} cols="50"/>
            </div>
          </div>
          <button className="ui fluid button" onClick={() => saveDish({
              name: name.value,
              description: description.value
            }, this.props)}>Create Dish</button>
          <h4>{this.props.error}</h4>
        </div>
      </div>
    </div>
    </div>
    </div>)
  }
};

const mapStateToProps = ({ authentication, ingredient }) => ({
  error: authentication.error,
  loading: authentication.loading,
  user: isEmpty(authentication.user) ? (JSON.parse(sessionStorage.getItem('user')) || {}) : authentication.user,
  ingredient: ingredient.ingredients
});

const mapDispatchToProps = dispatch => ({
  createDishRequest: () => dispatch({type: types.CREATE_DISH_REQUEST}),
  createDishSuccess: ingredient => dispatch({type: types.CREATE_DISH_SUCCESS, ingredient}),
  createDishFailure: error => dispatch({type: types.CREATE_DISH_FAILURE, error}),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateDish);
