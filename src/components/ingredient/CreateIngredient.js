import React from 'react';
import classNames from 'classnames';
require('./createIngredient.css');

const CreateIngredient = props => {
	return (<div className="ui one column grid CreateIngredientForm">
		<div className="row">
		 	<div className={classNames('ui raised very padded text container segment CreateIngredientForm-segment', { 'loading': props.loading })}>
				<div className="six wide centered column CreateIngredientForm-form">
					<h2 class="ui white center aligned header CreateIngredientForm-form--white">Create Ingredient</h2>
					<div className="ui form">
						<div className="three fields">
							<div className="field">
								<label className="CreateIngredientForm-label"> Name </label>
								<input type="text" placeholder="Enter Name"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Calories </label>
								<input type="number" placeholder="Enter Calories"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Total Fat (g) </label>
								<input type="number" placeholder="Enter Total Fat"  />
							</div>
						</div>
						<div className="three fields">
							<div className="field">
								<label className="CreateIngredientForm-label"> Saturated Fat (g) </label>
								<input type="number" placeholder="Enter Saturated Fat"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Trans Fat (g) </label>
								<input type="number" placeholder="Enter Trans Fat"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Polyunsaturated Fat (g) </label>
								<input type="number" placeholder="Enter Polyunsaturated Fat"  />
							</div>
						</div>
						<div className="three fields">
							<div className="field">
								<label className="CreateIngredientForm-label"> Monosaturated Fat (g) </label>
								<input type="number" placeholder="Enter Monosaturated Fat"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Cholesterol (mg) </label>
								<input type="number" placeholder="Enter Cholesterol"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Sodium (mg) </label>
								<input type="number" placeholder="Enter Sodium"  />
							</div>
						</div>
						<div className="three fields">
							<div className="field">
								<label className="CreateIngredientForm-label"> Total Carbohydrates (g) </label>
								<input type="number" placeholder="Enter Total Carbohydrates"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Dietary Fiber (g) </label>
								<input type="number" placeholder="Enter Dietary Fiber"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Sugars (g) </label>
								<input type="number" placeholder="Enter Sugars"  />
							</div>
						</div>
						<div className="three fields">
							<div className="field">
								<label className="CreateIngredientForm-label"> Added Sugar (g) </label>
								<input type="number" placeholder="Enter Sugar"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Sugar Alcohol (g) </label>
								<input type="number" placeholder="Enter Sugar Alcohol"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Protein (g) </label>
								<input type="number" placeholder="Enter Protein"  />
							</div>
						</div>
						<div className="four fields">
							<div className="field">
								<label className="CreateIngredientForm-label"> Calcium (%) </label>
								<input type="number" placeholder="Enter Calcium"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Iron (%) </label>
								<input type="number" placeholder="Enter Iron"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Vitamin D (%) </label>
								<input type="number" placeholder="Enter Vitamin D"  />
							</div>
							<div className="field">
								<label className="CreateIngredientForm-label"> Potassium (%) </label>
								<input type="number" placeholder="Enter Potassium"  />
							</div>
						</div>
						<div className="field">
							<label className="CreateIngredientForm-label"> Description </label>
							<textarea rows="4" cols="50" />
						</div>
						<button className="ui fluid button"
							onClick={() => true}>Create Ingredient</button>
						<h4>{props.error}</h4>
					</div>
				</div>
		 	</div>
		</div>
	</div>);
};

export default CreateIngredient;