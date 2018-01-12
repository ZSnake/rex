import  React,{ Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import * as types from '../../redux/dish/types';
import dishesService from '../../services/dishes';

require('./dishes.css');

const getDishes = ({getDishesSuccess, getDishesFailure,
  getDishesRequest, user, history}) => {
    getDishesRequest();
    return dishesService.getDishes(user.token)
    .then(response => response.json())
    .then(result => {
      if(result.statusCode >= 400)
        return getDishesFailure(result.error);
      getDishesSuccess(result);
      history.push('/profile');
    })
    .catch(error => getDishesFailure(error));
};

class Profile extends Component {
  componentDidMount = () => {
    if(isEmpty(this.props.user) || this.props.user.type !== 'admin')
      this.props.history.push('/');
    getDishes(this.props);
  };

  render = () => {
    return (
      <div className="row">
        <div className='ui raised very padded segment text ingredientsContainer-segment'>
          <div className="center aligned">
            <h1 className="center aligned">Profile</h1>
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
                      <i className="fa fa-info-circle fa-2x"></i>
                    </button>
                    <button className="actionButton">
                      <i className="fa fa-pencil fa-2x"></i>
                    </button>
                    <button className="actionButton">
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

const mapStateToProps = ({ authentication, dish }) => ({
  error: authentication.error,
  loading: authentication.loading,
  user: isEmpty(authentication.user) ? (JSON.parse(sessionStorage.getItem('user')) || {}) : authentication.user,
  dishes: dish.dishes,
});

const mapDispatchToProps = dispatch => ({
  getDishesRequest: () => dispatch({type: types.GET_DISHES_REQUEST}),
  getDishesSuccess: dishes => dispatch({type: types.GET_DISHES_SUCCESS, dishes}),
  getDishesFailure: error => dispatch({type: types.GET_DISHES_FAILURE, error})
})


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
