import  React,{ Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import * as types from '../../redux/ingredient/types';
import ingredientService from '../../services/ingredients';
import dishesService from '../../services/dishes';

require('./ingredients.css');

class AddDishIngredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.history.location.state.id,
      ingredients: []
    };
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
        history.push('/adddishingredients', {id: this.props.history.location.state.id});
      })
      .catch(error => getIngredientsFailure(error));
  }

  render = () => {
    return (
      <div className="row">
        <div className='ui raised very padded segment text ingredientsContainer-segment'>
          <div className="center aligned">
            <h1 className="center aligned">Add Ingredients to Dish</h1>
          </div>
          <table className="ui celled selectable inverted table">
            <thead>
              <tr className="center aligned">
                <th>Name</th>
                <th>Amount</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              {this.props.ingredients.map(ingredient => (
                <tr key={ingredient.id}>
                  <td>{ingredient.name}</td>
                  <td>
                    <div className="field">
							        <input id={ingredient.id} type="number" placeholder="Enter Amount"  />
    							  </div>
                  </td>
                  <td className="center aligned">
                    <button className="actionButton" onClick={() => {
                      let amount = parseFloat(document.getElementById(`${ingredient.id}`).value);
                      this.setState((prevState) => {
                        let ingredients = prevState.ingredients;
                        console.log('the check');
                        console.log(check);
                        ingredients.push({
                          ingredientId: ingredient.id,
                          amount
                        });
                        return {
                          ingredients
                        }
                      });
                      document.getElementById(`${ingredient.id}`).value = '';
                    }}>
                      <i className="fa fa-plus fa-2x"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row add-button-container">
            <button onClick={() => {
              let payload = {
                id: this.state.id,
                ingredients: { ingredients: this.state.ingredients }
              }
              dishesService.addIngredientsToDish(this.props.user.token, payload);
              this.props.history.push('/dishes')
            }} className="ui circular large icon button right floated">
              Done
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


export default connect(mapStateToProps, mapDispatchToProps)(AddDishIngredients);
