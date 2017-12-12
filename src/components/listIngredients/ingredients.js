import  React,{ Component } from 'react';
import { Redirect } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import * as types from '../../redux/ingredient/types';
import ingredientService from '../../services/ingredients';

require('./ingredients.css');

const getIngredients = ({getIngredientsSuccess, getIngredientsFailure,
  getIngredientsRequest, user, history}) => {
    getIngredientsRequest();
    return ingredientService.getIngredients(user.token)
    .then(response => response.json())
    .then(result => {
      getIngredientsSuccess(result);
      history.push('/ingredients');
    })
    .catch(error => getIngredientsFailure(error));
};

class Ingredients extends Component {
  componentDidMount = () => {
    getIngredients(this.props);
  };

  render = () => {
    if(isEmpty(this.props.user) || this.props.user.type !== 'admin')
      return <Redirect to="/" />
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
                    <span className="actionButton">
                      <i className="fa fa-info-circle fa-2x"></i>
                    </span>
                    <span className="actionButton">
                      <i className="fa fa-pencil fa-2x"></i>
                    </span>
                    <span className="actionButton">
                      <i className="fa fa-trash fa-2x"></i>
                    </span>
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
  getIngredientsFailure: error => dispatch({type: types.GET_INGREDIENTS_FAILURE, error})
})


export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);