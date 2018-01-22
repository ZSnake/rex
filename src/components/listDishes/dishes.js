import  React,{ Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import * as types from '../../redux/dish/types';
import dishesService from '../../services/dishes';
import * as typesIngredient from '../../redux/ingredient/types';

require('./dishes.css');

class Dishes extends Component {
  constructor(props) {
    super(props);
    this.getDishes = this.getDishes.bind(this);
    this.deleteTheDish = this.deleteTheDish.bind(this);
  }
  async deleteTheDish(dish, {getDishesRequest, deleteDishSuccess, deleteDishFailure,
    deleteDishRequest, user, history}){
      deleteDishRequest();
      this.getDishes(this.props);
      await dishesService.deleteDish(user.token, dish)
      .then(response => response.json()).then(result => {
        this.getDishes(this.props);
      })
      .catch(error => deleteDishFailure(error));
  }
  getDishes({getDishesSuccess, getDishesFailure,
    getDishesRequest, user, history}){
      getDishesRequest();
      return dishesService.getDishes(user.token)
      .then(response => response.json())
      .then(result => {
        if(result.statusCode >= 400)
          return getDishesFailure(result.error);
        getDishesSuccess(result);
        history.push('/dishes');
      })
      .catch(error => getDishesFailure(error));
  }
  componentDidMount = () => {
    if(isEmpty(this.props.user))
      this.props.history.push('/');
    this.getDishes(this.props);
  }

  render = () => {
    return (
      <div className="row">
        <div className="ui modal">
          <div className="header">Header</div>
          <div className="content">
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
        <div className='ui raised very padded segment text ingredientsContainer-segment'>
          <div className="center aligned">
            <h1 className="center aligned">Dishes</h1>
          </div>
          <table className="ui celled selectable inverted table">
            <thead>
              <tr className="center aligned">
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.dishes.map(dish => (
                <tr key={dish.id}>
                  <td>{dish.name}</td>
                  <td>{dish.description}</td>
                  <td className="center aligned">
                    <button className="actionButton">
                      <i className="fa fa-info-circle fa-2x" ></i>
                    </button>
                    <button className="actionButton" onClick={() => {
                      this.props.history.push('/adddishingredients', {id: dish.id});
                    }}>
                      <i className="fa fa-plus-circle fa-2x"></i>
                    </button>
                    <button className="actionButton" onClick={() => this.deleteTheDish({
                      id: dish.id
                    }, this.props)}>
                      <i className="fa fa-trash fa-2x"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row add-button-container">
            <button onClick={() => {this.props.history.push('/createdish')}} className="ui circular large icon button right floated">
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({ authentication, dish, ingredient }) => ({
  error: authentication.error,
  loading: authentication.loading,
  user: isEmpty(authentication.user) ? (JSON.parse(sessionStorage.getItem('user')) || {}) : authentication.user,
  dishes: dish.dishes,
  ingredient: ingredient.ingredients
});

const mapDispatchToProps = dispatch => ({
  getDishesRequest: () => dispatch({type: types.GET_DISHES_REQUEST}),
  getDishesSuccess: dishes => dispatch({type: types.GET_DISHES_SUCCESS, dishes}),
  getDishesFailure: error => dispatch({type: types.GET_DISHES_FAILURE, error}),
  deleteDishRequest: () => dispatch({type: types.DELETE_DISH_REQUEST}),
  deleteDishSuccess: dishes => dispatch({type: types.DELETE_DISH_SUCCESS, dishes}),
  deleteDishFailure: error => dispatch({type: types.DELETE_DISH_FAILURE, error}),
  getIngredientsRequest: () => dispatch({type: typesIngredient.GET_INGREDIENTS_REQUEST}),
  getIngredientsSuccess: ingredients => dispatch({type: typesIngredient.GET_INGREDIENTS_SUCCESS, ingredients}),
  getIngredientsFailure: error => dispatch({type: typesIngredient.GET_INGREDIENTS_FAILURE, error}),
})


export default connect(mapStateToProps, mapDispatchToProps)(Dishes);
