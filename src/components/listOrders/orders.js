import  React,{ Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import * as types from '../../redux/order/types';
import ordersService from '../../services/orders';

require('./dishes.css');

const getOrders = ({getOrdersSuccess, getOrdersFailure,
  getOrdersRequest, user, history}) => {
    getOrdersRequest();
    return ordersService.getOrders(user.token)
    .then(response => response.json())
    .then(result => {
      if(result.statusCode >= 400)
        return getOrdersFailure(result.error);
      getOrdersSuccess(result.orders);
      history.push('/orders', { orders: result});
    })
    .catch(error => getOrdersFailure(error));
};

const deleteTheOrder = (order, {deleteOrderSuccess, deleteOrderFailure,
  deleteOrderRequest, user, history}) => {
    deleteOrderRequest();
    return ordersService.deleteOrder(user.token, order)
    .then(response => response.json())
    .then(result => {
      deleteOrderSuccess(result);
      history.push('/orders');
    })
    .catch(error => deleteOrderFailure(error));
};

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: this.props.history.location.state.orders
    }
  }
  componentDidMount = () => {
    if(isEmpty(this.props.user))
      this.props.history.push('/');
    getOrders(this.props);
  };

  render = () => {
    console.log(this.state.orders);
    return (
      <div className="row">
        <div className='ui raised very padded segment text ingredientsContainer-segment'>
          <div className="center aligned">
            <h1 className="center aligned">Orders</h1>
          </div>
          <table className="ui celled selectable inverted table">
            <thead>
              <tr className="center aligned">
                <th>Colony</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map(order => (
                <tr key={order.id}>
                  <td>{order.address.colony}</td>
                  <td className="center aligned">
                    <button className="actionButton">
                      <i className="fa fa-info-circle fa-2x"></i>
                    </button>
                    <button className="actionButton" onClick={() => deleteTheOrder({
                      id: order.id,
                      done: true
                    })}>
                      <i className="fa fa-trash fa-2x"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({ authentication }, order) => ({
  error: authentication.error,
  loading: authentication.loading,
  user: isEmpty(authentication.user) ? (JSON.parse(sessionStorage.getItem('user')) || {}) : authentication.user,
  orders: order.orders,
});

const mapDispatchToProps = dispatch => ({
  getOrdersRequest: () => dispatch({type: types.GET_ORDERS_REQUEST}),
  getOrdersSuccess: orders => dispatch({type: types.GET_ORDERS_SUCCESS, orders}),
  getOrdersFailure: error => dispatch({type: types.GET_ORDERS_FAILURE, error}),
  deleteOrderRequest: () => dispatch({type: types.DELETE_ORDER_REQUEST}),
  deleteOrderSuccess: orders => dispatch({type: types.DELETE_ORDER_SUCCESS, orders}),
  deleteOrderFailure: error => dispatch({type: types.DELETE_ORDER_FAILURE, error}),
})


export default connect(mapStateToProps, mapDispatchToProps)(Orders);
