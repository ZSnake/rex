import  React,{ Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import * as types from '../../redux/ingredient/types';
import ingredientService from '../../services/ingredients';

require('./ingredients.css');

const ingredientStyle = {
  "margin": 10
};

class Ingredients extends Component {
  constructor(props) {
    super(props);
    this.getIngredients = this.getIngredients.bind(this);
    this.deleteTheIngredient = this.deleteTheIngredient.bind(this);
  }
  componentDidMount = () => {
    if(isEmpty(this.props.user))
      this.props.history.push('/');
    this.getIngredients(this.props);
  }
  async deleteTheIngredient(ingredient, {getIngredientsRequest, deleteIngredientSuccess, deleteIngredientFailure,
    deleteIngredientRequest, user, history}){
      deleteIngredientRequest();
      this.getIngredients(this.props);
      await ingredientService.deleteIngredient(user.token, ingredient)
      .then(response => response.json()).then(result => {
        this.getIngredients(this.props);
      })
      .catch(error => deleteIngredientFailure(error));
  }

  getIngredients({getIngredientsSuccess, getIngredientsFailure,
    getIngredientsRequest, user, history}) {
      getIngredientsRequest();
      return ingredientService.getIngredients(user.token)
      .then(response => response.json())
      .then(result => {
        if(result.statusCode >= 400)
          return getIngredientsFailure(result.error);
        getIngredientsSuccess(result);
        history.push('/ingredients');
      })
      .catch(error => getIngredientsFailure(error));
  }

  render = () => {
    return (
      <div className="row">
        <div className='ui raised very padded segment text ingredientsContainer-segment'>
          <div className="center aligned">
            <h1 className="center aligned">Ingredients</h1>
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
              {this.props.ingredients.map(ingredient => (
                <tr key={ingredient.id}>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.description}</td>
                  <td className="center aligned">
                    <div className="modal" id="dish-modal">
                      <div className="modal-content">
                        <div className="modal-header">
                        </div>
                        <div className="modal-body">
                          <div className="ui grid centered" id="card-container">
                            <div className="two column row ui cards">
                              {
                                <div key={ingredient.id}>
                                  <div className="ui card" style={ingredientStyle}>
                                    <div className="content">
                                      <div className="header">Calories: {ingredient.calories}</div>
                                      <div className="header">Total Fat: {ingredient.totalFat}</div>
                                      <div className="header">Saturated Fat: {ingredient.saturatedFat}</div>
                                      <div className="header">Trans Fat: {ingredient.transFat}</div>
                                      <div className="header">Polyunsaturated Fat: {ingredient.polyunsaturatedFat}</div>
                                      <div className="header">Monosaturated Fat: {ingredient.monosaturatedFat}</div>
                                      <div className="header">Cholesterol: {ingredient.cholesterol}</div>
                                      <div className="header">Sodium: {ingredient.sodium}</div>
                                      <div className="header">Total Carbohydrates: {ingredient.totalCarbohydrates}</div>
                                      <div className="header">Dietary Fiber: {ingredient.dietaryFiber}</div>
                                      <div className="header">Sugars: {ingredient.sugars}</div>
                                      <div className="header">Added Sugar: {ingredient.addedSugar}</div>
                                      <div className="header">Sugar Alcohol: {ingredient.sugarAlcohol}</div>
                                      <div className="header">Protein: {ingredient.protein}</div>
                                      <div className="header">Calcium: {ingredient.calcium}</div>
                                      <div className="header">Iron: {ingredient.iron}</div>
                                      <div className="header">Vitamin D: {ingredient.vitaminD}</div>
                                    </div>
                                  </div>
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button className="ui button" onClick={() => {
                              document.getElementById('dish-modal').style.display = 'none'
                          }}>Done</button>
                        </div>
                      </div>
                    </div>
                    <button className="actionButton">
                      <i className="fa fa-info-circle fa-2x" onClick={() => {
                        document.getElementById('dish-modal').style.display = 'flex';
                      }}></i>
                    </button>
                    <button className="actionButton">
                      <i className="fa fa-pencil fa-2x"></i>
                    </button>
                    <button className="actionButton" onClick={() => this.deleteTheIngredient({
                      id: ingredient.id
                    }, this.props)}>
                      <i className="fa fa-trash fa-2x"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row add-button-container">
            <button onClick={() => {this.props.history.push('/createingredient')}} className="ui circular large icon button right floated">
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({ authentication, ingredient }) => ({
  error: authentication.error,
  loading: authentication.loading,
  user: isEmpty(authentication.user) ? (JSON.parse(sessionStorage.getItem('user')) || {}) : authentication.user,
  ingredients: ingredient.ingredients,
});

const mapDispatchToProps = dispatch => ({
  getIngredientsRequest: () => dispatch({type: types.GET_INGREDIENTS_REQUEST}),
  getIngredientsSuccess: ingredients => dispatch({type: types.GET_INGREDIENTS_SUCCESS, ingredients}),
  getIngredientsFailure: error => dispatch({type: types.GET_INGREDIENTS_FAILURE, error}),
  deleteIngredientRequest: () => dispatch({type: types.DELETE_INGREDIENT_REQUEST}),
  deleteIngredientSuccess: ingredients => dispatch({type: types.DELETE_INGREDIENT_SUCCESS, ingredients}),
  deleteIngredientFailure: error => dispatch({type: types.DELETE_INGREDIENT_FAILURE, error})
})


export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);
