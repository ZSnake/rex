import  React,{ Component } from 'react';
import isEmpty from 'lodash/isEmpty';
// import $ from 'jquery';
import { connect } from 'react-redux';
import * as types from '../../redux/dish/types';
import dishesService from '../../services/dishes';
import ingredientServices from '../../services/ingredients';
import * as typesIngredient from '../../redux/ingredient/types';

require('./dishes.css');

const ingredientStyle = {
  "margin": 10
};

class Dishes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    }
    this.getDishes = this.getDishes.bind(this);
    this.deleteTheDish = this.deleteTheDish.bind(this);
    this.listIngredients = this.listIngredients.bind(this);
    this.add = this.add.bind(this);
    this.addToDish = this.addToDish.bind(this);
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

  listIngredients ({getIngredientsSuccess, getIngredientsFailure,
     getIngredientsRequest, user, history}) {
       getIngredientsRequest();
       return ingredientServices.getIngredients(user.token).then(response => response.json())
       .then(result => {
         console.log(result);
         getIngredientsSuccess(result);
       })
       .catch(error => getIngredientsFailure(error));
  }

  add(id) {
    let currIngredients = this.state.ingredients;
    currIngredients.push(id);
    this.setState({
      ingredients: currIngredients
    });
  }

  addToDish(payload ,{getIngredientsSuccess, getIngredientsFailure,
    getIngredientsRequest, user, history}) {
    dishesService.addIngredientsToDish(user.token, payload);
  }

  componentDidMount = () => {
    if(isEmpty(this.props.user))
      this.props.history.push('/');
    this.getDishes(this.props);
    this.listIngredients(this.props);
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
                    <div className="modal" id="dish-modal">
                      <div className="modal-content">
                        <div className="modal-header">
                        </div>
                        <div className="modal-body">
                          <div className="ui grid centered" id="card-container">
                            <div className="two column row ui cards">
                              {
                                this.props.ingredient.map((ingredient) => {
                                  return (this.state.ingredients.indexOf(ingredient.id) === -1 ? (
                                    <div key={ingredient.id}>
                                      <div className="ui card" style={ingredientStyle}>
                                        <div className="content">
                                          <div className="header">{ingredient.name}</div>
                                        </div>
                                      </div>
                                      <div className="extra content">
                                        <div className="ui two buttons">
                                          <button className="ui green basic button" style={ingredientStyle} onClick={() => {this.add(ingredient.id)}}>Add</button>
                                        </div>
                                      </div>
                                    </div>
                                  ): '');
                                })
                              }
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button className="ui button" onClick={() => {
                              this.addToDish({
                                id: dish.id,
                                ingredientsIds: this.state.ingredients
                              }, this.props);
                              document.getElementById('dish-modal').style.display = 'none'
                          }}>Done</button>
                        </div>
                      </div>
                    </div>
                    <button className="actionButton">
                      <i className="fa fa-info-circle fa-2x" ></i>
                    </button>
                    <button className="actionButton" onClick={() => {
                      document.getElementById('dish-modal').style.display = 'flex';
                    }}>
                      <i className="fa fa-pencil fa-2x"></i>
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
