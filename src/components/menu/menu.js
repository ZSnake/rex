import  React,{ Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import * as types from '../../redux/dish/types';
import * as typesAddress from '../../redux/address/types';
import dishesService from '../../services/dishes';
import addressesService from '../../services/users';

require('./dishes.css');

const menuStyle = {
  "marginTop": 20
};

const confirmOrderStyle = {
  "marginBottom": 20
};

const baseURL = 'https://thehealthkitchen.blob.core.windows.net/images';

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

const getAddresses = ({getAddressesSuccess, getAddressesFailure,
  getAddressesRequest, user, history}) => {
    getAddressesRequest();
    return addressesService.getAddresses(user.token, user)
    .then(response => response.json())
    .then(result => {
      if(result.statusCode >= 400)
        return getAddressesFailure(result.error);
      getAddressesSuccess(result);
      history.push('/menu');
    })
    .catch(error => getAddressesFailure(error));
}

class Message extends Component {
  render() {
    return (<div className="ui message">
      <i aria-hidden="true" className="close icon"></i>
      <div className="content">
        <div className="header">Welcome back!</div>
        <p>Dish has been added.</p>
      </div>
    </div>)
  }
}

class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleAddDishesToOrder = this.handleAddDishesToOrder.bind(this);
    this.state = {
      dishesArray: [],
      visible: true
    }
  }
  componentDidMount = () => {
    if(isEmpty(this.props.user))
      this.props.history.push('/');
    getDishes(this.props);
    getAddresses(this.props);
  };
  handleAddDishesToOrder(dish) {
    this.setState((prevState) => {
      return {
        dishesArray: prevState.dishesArray.concat(dish)
      }
    });
  }
  render = () => {
    return (
      <div className="ui container ingredientsContainer-segment--white" id="main-container">
        {<Message/> && this.state.visible}

        <div className="row">
          <div className="center aligned">
            <h1 className="center aligned" style={menuStyle}>Menu</h1>
          </div>
        </div>
        <div className="ui grid centered" id="card-container">
          <div className="two column row ui cards">
            {this.props.dishes.map(dish => (
              <div className="ui card" key={dish.id}>
                <img src={`${baseURL}/${encodeURIComponent(dish.name)}.jpg`} alt={dish.name} className="ui image" />
                <div className="content">
                  <div className="header">{dish.name}</div>
                  <div className="description">{dish.description}</div>
                  <div className="ui attached button" id="order-button" onClick={() => {
                    this.setState((prevState) => ({ visible: !prevState.visible }));
                    this.handleAddDishesToOrder(dish)
                  }}>
                    Order
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="row">
          <a className="ui button" style={confirmOrderStyle} onClick={() => {
            this.props.history.push('/createorder', { dishes: this.state.dishesArray, addresses: this.props.addresses });
          }}>Confirm Order</a>
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({ authentication, dish, address }) => ({
  error: authentication.error,
  loading: authentication.loading,
  user: isEmpty(authentication.user) ? (JSON.parse(sessionStorage.getItem('user')) || {}) : authentication.user,
  dishes: dish.dishes,
  addresses: address.addresses
});

const mapDispatchToProps = dispatch => ({
  getDishesRequest: () => dispatch({type: types.GET_DISHES_REQUEST}),
  getDishesSuccess: dishes => dispatch({type: types.GET_DISHES_SUCCESS, dishes}),
  getDishesFailure: error => dispatch({type: types.GET_DISHES_FAILURE, error}),
  getAddressesRequest: () => dispatch({type: typesAddress.GET_ADDRESSES_REQUEST}),
  getAddressesSuccess: addresses => dispatch({type: typesAddress.GET_ADDRESSES_SUCCESS, addresses}),
  getAddressesFailure: error => dispatch({type: typesAddress.GET_ADDRESSES_FAILURE, error})
})


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
