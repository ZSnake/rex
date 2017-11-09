import React from 'react';
import classNames from 'classnames';
import { Redirect } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import * as types from '../../redux/ingredient/types';
import ingredientService from '../../services/ingredients';

require('./createIngredient.css');

const saveIngredient = (ingredient, {createIngredientSuccess, createIngredientFailure,
  createIngredientRequest, user, history}) => {
    createIngredientRequest();
    return ingredientService.createIngredient(user.token, ingredient)
    .then(response => response.json())
    .then(result => {
      createIngredientSuccess(result);
      history.push('/ingredients');
    })
    .catch(error => createIngredientFailure(error));
};

const CreateIngredient = props => {
  let name, calories, totalFat, saturatedFat, transFat, polyunsaturatedFat,
  monosaturatedFat, cholesterol, sodium, totalCarbs, dietaryFiber, sugars,
  addedSugar, sugarAlcohol, protein, calcium, iron, vitaminD, potassium,
  description;
  if(isEmpty(props.user) || props.user.type !== 'admin')
    return <Redirect to="/" />
	return (<div className="ui one column grid CreateIngredientForm">
		<div className="row">
		 	<div className={classNames('ui raised very padded text container segment CreateIngredientForm-segment', { 'loading': props.loading })}>
				<div className="six wide centered column CreateIngredientForm-form">
					<h2 className="ui white center aligned header CreateIngredientForm-form--white">Create Ingredient</h2>
					<div className="ui form">
						<div className="three fields">
							<div className="field">
								<label className="CreateIngredientForm-label"> Name </label>
								<input type="text" ref={node => {name = node}} placeholder="Enter Name"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Calories </label>
								<input type="number" ref={node => {calories = node}} placeholder="Enter Calories"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Total Fat (g) </label>
								<input type="number" ref={node => {totalFat = node}} placeholder="Enter Total Fat"  />
							</div>
						</div>
						<div className="three fields">
							<div className="field">
								<label className="CreateIngredientForm-label"> Saturated Fat (g) </label>
								<input type="number" ref={node => {saturatedFat = node}} placeholder="Enter Saturated Fat"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Trans Fat (g) </label>
								<input type="number" ref={node => {transFat = node}} placeholder="Enter Trans Fat"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Polyunsaturated Fat (g) </label>
								<input type="number" ref={node => {polyunsaturatedFat = node}} placeholder="Enter Polyunsaturated Fat"  />
							</div>
						</div>
						<div className="three fields">
							<div className="field">
								<label className="CreateIngredientForm-label"> Monosaturated Fat (g) </label>
								<input type="number" ref={node => {monosaturatedFat = node}} placeholder="Enter Monosaturated Fat"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Cholesterol (mg) </label>
								<input type="number" ref={node => {cholesterol = node}} placeholder="Enter Cholesterol"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Sodium (mg) </label>
								<input type="number" ref={node => {sodium = node}} placeholder="Enter Sodium"  />
							</div>
						</div>
						<div className="three fields">
							<div className="field">
								<label className="CreateIngredientForm-label"> Total Carbohydrates (g) </label>
								<input type="number" ref={node => {totalCarbs = node}} placeholder="Enter Total Carbohydrates"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Dietary Fiber (g) </label>
								<input type="number" ref={node => {dietaryFiber = node}} placeholder="Enter Dietary Fiber"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Sugars (g) </label>
								<input type="number" ref={node => {sugars = node}} placeholder="Enter Sugars"  />
							</div>
						</div>
						<div className="three fields">
							<div className="field">
								<label className="CreateIngredientForm-label"> Added Sugar (g) </label>
								<input type="number" ref={node => {addedSugar = node}} placeholder="Enter Sugar"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Sugar Alcohol (g) </label>
								<input type="number" ref={node => {sugarAlcohol = node}} placeholder="Enter Sugar Alcohol"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Protein (g) </label>
								<input type="number" ref={node => {protein = node}} placeholder="Enter Protein"  />
							</div>
						</div>
						<div className="four fields">
							<div className="field">
								<label className="CreateIngredientForm-label"> Calcium (%) </label>
								<input type="number" ref={node => {calcium = node}} placeholder="Enter Calcium"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Iron (%) </label>
								<input type="number" ref={node => {iron = node}} placeholder="Enter Iron"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Vitamin D (%) </label>
								<input type="number" ref={node => {vitaminD = node}} placeholder="Enter Vitamin D"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Potassium (%) </label>
								<input type="number" ref={node => {potassium = node}} placeholder="Enter Potassium"  />
							</div>
						</div>
						<div className="field">
							<label className="CreateIngredientForm-label"> Description </label>
							<textarea rows="4" ref={node => {description = node}} cols="50" />
						</div>
						<button className="ui fluid button"
							onClick={() => saveIngredient({
                name: name.value,
                calories: calories.value,
                totalFat: totalFat.value,
                saturatedFat: saturatedFat.value,
                transFat: transFat.value,
                polyunsaturatedFat: polyunsaturatedFat.value,
                monosaturatedFat: monosaturatedFat.value,
                cholesterol: cholesterol.value,
                sodium: sodium.value,
                totalCarbohydrates: totalCarbs.value,
                dietaryFiber: dietaryFiber.value,
                sugars: sugars.value,
                addedSugar: addedSugar.value,
                sugarAlcohol: sugarAlcohol.value,
                protein: protein.value,
                calcium: calcium.value,
                iron: iron.value,
                vitaminD: vitaminD.value,
                potassium: potassium.value,
                description: description.value
              }, props)}>Create Ingredient</button>
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
  createIngredientRequest: () => dispatch({type: types.CREATE_INGREDIENT_REQUEST}),
  createIngredientSuccess: ingredient => dispatch({type: types.CREATE_INGREDIENT_SUCCESS, ingredient}),
  createIngredientFailure: error => dispatch({type: types.CREATE_INGREDIENT_FAILURE, error})
})


export default connect(mapStateToProps, mapDispatchToProps)(CreateIngredient);