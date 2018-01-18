import  React,{ Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import * as types from '../../redux/address/types';
import addressesService from '../../services/users';

require('./dishes.css');

const ingredientStyle = {
  "margin": 10
};

class Addresses extends Component {
  constructor(props) {
    super(props);
    this.getAddresses = this.getAddresses.bind(this);
    this.deleteTheAddress = this.deleteTheAddress.bind(this);
  }
  async deleteTheAddress(address, {getAddressesRequest, deleteAddressSuccess, deleteAddressFailure,
    deleteAddressRequest, user, history}){
      deleteAddressRequest();
      this.getAddresses(this.props);
      await addressesService.deleteAddress(user, address)
      .then(response => response.json()).then(result => {
        this.getAddresses(this.props);
      })
      .catch(error => deleteAddressFailure(error));
  }
  getAddresses({getAddressesSuccess, getAddressesFailure,
    getAddressesRequest, user, history}){
      getAddressesRequest();
      return addressesService.getAddresses(user.token, user)
      .then(response => response.json())
      .then(result => {
        if(result.statusCode >= 400)
          return getAddressesFailure(result.error);
        getAddressesSuccess(result);
        history.push('/addresses');
      })
      .catch(error => getAddressesFailure(error));
  }

  componentDidMount = () => {
    if(isEmpty(this.props.user))
      this.props.history.push('/');
    this.getAddresses(this.props);
  }

  render = () => {
    return (
      <div className="row">
        <div className='ui raised very padded segment text ingredientsContainer-segment'>
          <div className="center aligned">
            <h1 className="center aligned">Addresses</h1>
          </div>
          <table className="ui celled selectable inverted table">
            <thead>
              <tr className="center aligned">
                <th>Colony</th>
                <th>Reference</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.addresses.map(address => (
                <tr key={address.id}>
                  <td>{address.colony}</td>
                  <td>{address.celphone}</td>
                  <td className="center aligned">
                    <div className="modal" id="dish-modal">
                      <div className="modal-content">
                        <div className="modal-header">
                        </div>
                        <div className="modal-body">
                          <div className="ui grid centered" id="card-container">
                            <div className="two column row ui cards">
                              {
                                <div key={address.id}>
                                  <div className="ui card" style={ingredientStyle}>
                                    <div className="content">
                                      <div className="header">Colony:  {address.colony}</div>
                                      <div className="header">City:  {address.city}</div>
                                      <div className="header">Department:  {address.department}</div>
                                      <div className="header">Phone:  {address.phone}</div>
                                      <div className="header">Cellphone:  {address.celphone}</div>
                                      <div className="header">Street:  {address.street}</div>
                                      <div className="header">Block:  {address.block}</div>
                                      <div className="header">House:  {address.house}</div>
                                      <div className="header">Reference:  {address.reference}</div>
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
                    <button className="actionButton" onClick={() => {
                      document.getElementById('dish-modal').style.display = 'flex';
                    }}>
                      <i className="fa fa-info-circle fa-2x" ></i>
                    </button>
                    <button className="actionButton" onClick={() => this.deleteTheAddress({
                      id: address.id
                    }, this.props)}>
                      <i className="fa fa-trash fa-2x"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row add-button-container">
            <button onClick={() => {this.props.history.push('/createaddress')}} className="ui circular large icon button right floated">
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({ authentication, address }) => ({
  error: authentication.error,
  loading: authentication.loading,
  user: isEmpty(authentication.user) ? (JSON.parse(sessionStorage.getItem('user')) || {}) : authentication.user,
  addresses: address.addresses
});

const mapDispatchToProps = dispatch => ({
  getAddressesRequest: () => dispatch({type: types.GET_ADDRESSES_REQUEST}),
  getAddressesSuccess: addresses => dispatch({type: types.GET_ADDRESSES_SUCCESS, addresses}),
  getAddressesFailure: error => dispatch({type: types.GET_ADDRESSES_FAILURE, error}),
  deleteAddressRequest: () => dispatch({type: types.DELETE_ADDRESS_REQUEST}),
  deleteAddressSuccess: addresses => dispatch({type: types.DELETE_ADDRESS_SUCCESS, addresses}),
  deleteAddressFailure: error => dispatch({type: types.DELETE_ADDRESS_FAILURE, error}),
})


export default connect(mapStateToProps, mapDispatchToProps)(Addresses);
