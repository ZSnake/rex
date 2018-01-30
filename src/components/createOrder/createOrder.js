import  React,{ Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import * as typesOrder from '../../redux/order/types';
import ordersService from '../../services/orders';

require('./ingredients.css');

const h3Style = {
  "marginTop": 20,
  "marginBottom": 20
}

const saveOrder = (order, {createOrderSuccess, createOrderFailure,
  createOrderRequest, user, history}) => {
    return ordersService.createOrder(user, order)
    .then(response => response.json())
    .then(result => {
      createOrderSuccess(result);
      history.push('/menu');
    })
    .catch(error => createOrderFailure(error));
};

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: this.props.history.location.state.dishes,
      addresses: this.props.history.location.state.addresses
    };
  }
  componentDidMount = () => {
    if(isEmpty(this.props.user))
      this.props.history.push('/');
  }
  render = () => {
    let addressId, cash, card;
    return (
      <div className="row">
        <div className='ui raised very padded segment text ingredientsContainer-segment'>
          <div className="center aligned">
            <h1 className="center aligned">Confirm Order</h1>
          </div>
          <table className="ui celled selectable inverted table">
            <thead>
              <tr className="center aligned">
                <th>Dish</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {this.state.dishes.map((dish, index) => (
                <tr key={index}>
                  <td>{dish.name}</td>
                  <td className="center aligned">
                    <button className="actionButton" onClick={() => {
                      this.setState((prevState) => ({ dishes: prevState.dishes.filter((dishToDelete, indexIndexToDelete) => indexIndexToDelete !== index)}));
                    }}>
                      <i className="fa fa-trash fa-2x"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="ui grid">
            <form>
              <div className="row">
                <h3 style={h3Style}>Addresses</h3>
              </div>
              {this.state.addresses.map((address) => {
                return (
                  <div className="row ui radio checkbox" key={address.id}>
                    <input type="radio" name="id" id={address.id}  value={address.id} onClick={() => {
                      addressId = document.getElementById(`${address.id}`).value;
                    }}/>
                    <label id="label-semantic">{address.colony}</label>
                  </div>
                );
              })}
              <div className="row">
                <h3 style={h3Style}>Payment Method</h3>
              </div>
              <div className="row ui radio checkbox">
                <input type="radio" name="payment" id="cash" value="cash" onClick= {() => {
                  if (card) {
                    cash = true;
                    card = false;
                  }else {
                    cash = true;
                  }
                }}/>
                <label id="label-semantic">Cash</label>
              </div>
              <div className="row ui radio checkbox">
                <input type="radio" name="payment" id="card" value="card" onClick= {() => {
                  if (cash) {
                    card = true;
                    cash = false;
                  }else {
                    card = true;
                  }
                }}/>
                <label id="label-semantic">Card</label>
              </div>
              <div className="row">
                <h3 style={h3Style}>Additional Details</h3>
              </div>
              <div className="field" style={h3Style}>
                <textarea id="additionalDetails" rows="rows 6" cols="40"/>
              </div>
            </form>
          </div>
          <div className="row add-button-container">
            <button className="ui circular large icon button right floated" onClick={() => {
              let dishes = [];
              this.state.dishes.forEach((dish) => dishes.push(dish.id));
              if (cash) {
                  card = false;
              }else if (card) {
                cash = false;
              }
              let order = {
                card,
                cash,
                additionalDetails: document.getElementById('additionalDetails').value,
                dishes,
                addressId
              };
              saveOrder(order, this.props);
            }}>
              Done
            </button>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({ authentication}, address) => ({
  error: authentication.error,
  loading: authentication.loading,
  user: isEmpty(authentication.user) ? (JSON.parse(sessionStorage.getItem('user')) || {}) : authentication.user,
  addresses: address.addresses
});

const mapDispatchToProps = dispatch => ({
  createOrderRequest: () => dispatch({type: typesOrder.CREATE_ORDER_REQUEST}),
  createOrderSuccess: order => dispatch({type: typesOrder.CREATE_ORDER_SUCCESS, order}),
  createOrderFailure: error => dispatch({type: typesOrder.CREATE_ORDER_FAILURE, error})
})


export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
