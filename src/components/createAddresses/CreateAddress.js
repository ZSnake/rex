import React from 'react';
import classNames from 'classnames';
import { Redirect } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import * as types from '../../redux/address/types';
import addressService from '../../services/users';

require('./createIngredient.css');

const saveAddress = (address, {createAddressSuccess, createAddressFailure,
  createAddressRequest, user, history}) => {
    return addressService.addAddressToUser(user, address)
    .then(response => response.json())
    .then(result => {
      createAddressSuccess(result);
      history.push('/addresses');
    })
    .catch(error => createAddressFailure(error));
};

const CreatetextAddress = props => {
  let colony, city, department, phone, celphone, street,
  block, house, reference;
  if(isEmpty(props.user))
    return <Redirect to="/" />
	return (<div className="ui one column grid CreateIngredientForm">
		<div className="row">
		 	<div className={classNames('ui raised very padded text container segment CreateIngredientForm-segment', { 'loading': props.loading })}>
				<div className="six wide centered column CreateIngredientForm-form">
					<h2 className="ui white center aligned header CreateIngredientForm-form--white">Create Address</h2>
					<div className="ui form">
						<div className="three fields">
							<div className="field">
								<label className="CreateIngredientForm-label"> Colony </label>
								<input type="text" ref={node => {colony = node}} placeholder="Colony"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> City </label>
								<input type="text" ref={node => {city = node}} placeholder="City"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Department </label>
								<input type="text" ref={node => {department = node}} placeholder="Department"  />
							</div>
						</div>
						<div className="three fields">
							<div className="field">
								<label className="CreateIngredientForm-label"> Phone </label>
								<input type="text" ref={node => {phone = node}} placeholder="Phone"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Cellphone </label>
								<input type="text" ref={node => {celphone = node}} placeholder="Cellphone"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Street </label>
								<input type="text" ref={node => {street = node}} placeholder="Street"  />
							</div>
						</div>
						<div className="three fields">
							<div className="field">
								<label className="CreateIngredientForm-label"> Block </label>
								<input type="text" ref={node => {block = node}} placeholder="Block"  />
							</div>
              <div className="field">
								<label className="CreateIngredientForm-label"> House </label>
								<input type="text" ref={node => {house = node}} placeholder="House"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Reference </label>
								<input type="text" ref={node => {reference = node}} placeholder="Reference"  />
							</div>
						</div>
						<button className="ui fluid button"
							onClick={() => saveAddress({
                colony: colony.value,
                city: city.value,
                department: department.value,
                phone: phone.value,
                celphone: celphone.value,
                street: street.value,
                block: block.value,
                house: house.value,
                reference: reference.value
              }, props)}>Create Address</button>
						<h4>{props.error}</h4>
					</div>
				</div>
		 	</div>
		</div>
	</div>);
};

const mapStateToProps = ({ authentication }) => ({
  error: authentication.error,
  loading: authentication.loading,
  user: isEmpty(authentication.user) ? (JSON.parse(sessionStorage.getItem('user')) || {}) : authentication.user
});

const mapDispatchToProps = dispatch => ({
  createAddressRequest: () => dispatch({type: types.CREATE_ADDRESS_REQUEST}),
  createAddressSuccess: address => dispatch({type: types.CREATE_ADDRESS_SUCCESS, address}),
  createAddressFailure: error => dispatch({type: types.CREATE_ADDRESS_FAILURE, error})
})


export default connect(mapStateToProps, mapDispatchToProps)(CreatetextAddress);
