import  React,{ Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import * as types from '../../redux/dish/types';
import dishesService from '../../services/dishes';

require('./dishes.css');

// const baseURL = '';

const getDishes = ({getDishesSuccess, getDishesFailure,
  getDishesRequest, user, history}) => {
    getDishesRequest();
    return dishesService.getDishes(user.token)
    .then(response => response.json())
    .then(result => {
      if(result.statusCode >= 400)
        return getDishesFailure(result.error);
      getDishesSuccess(result);
      history.push('/menu');
    })
    .catch(error => getDishesFailure(error));
};

class Menu extends Component {
  componentDidMount = () => {
    if(isEmpty(this.props.user) || this.props.user.type !== 'admin')
      this.props.history.push('/');
    getDishes(this.props);
  };

  render = () => {
    return (
      <div className="ui container ingredientsContainer-segment--white" id="main-container">
        <div className="row">
          <div className="center aligned">
            <h1 className="center aligned">Menu</h1>
          </div>
        </div>
        <div className="ui grid centered" id="card-container">
          <div className="two column row ui cards">
            {this.props.dishes.map(dish => (
              <div className="ui card" key={dish.id}>
                {/* <img src={`${baseURL}/${dish.name}`} class="ui image" /> */}
                <div className="content">
                  <div className="header">{dish.name}</div>
                  <div className="description">{dish.description}</div>
                  <div className="ui attached button" id="order-button">
                    Order
                  </div>
                </div>
              </div>
            ))}
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


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
