import  React,{ Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import * as types from '../../redux/dish/types';

require('./dishes.css');


class Profile extends Component {
  componentDidMount = () => {
    if(isEmpty(this.props.user) || this.props.user.type !== 'admin')
      this.props.history.push('/');
  };

  render = () => {
    return (
      <div className="form-text-color">
        <form className="ui large form">
          <div className="equal width fields">
            <div className="field">
              <label>Colony</label>
              <input placeholder="Colony" />
            </div>
            <div className="field">
              <label>City</label>
              <input placeholder="City" />
            </div>
            <div className="field">
              <label>Department</label>
              <input placeholder="Department" />
            </div>
            <div className="field">
              <label>Phone</label>
              <input placeholder="Phone" />
            </div>
            <div className="field">
              <label>Cellphone</label>
              <input placeholder="Cellphone" />
            </div>
            <div className="field">
              <label>Street</label>
              <input placeholder="Street" />
            </div>
            <div className="field">
              <label>Block</label>
              <input placeholder="Block" />
            </div>
            <div className="field">
              <label>House</label>
              <input placeholder="House" />
            </div>
            <div className="field">
              <label>Reference</label>
              <input placeholder="Reference" />
            </div>
          </div>
          <button type="submit" className="ui button">Submit</button>
          <div className="ui hidden divider">
          </div>
        </form>
      </div>
    )
  }
};

const mapStateToProps = ({ authentication, dish }) => ({
  error: authentication.error,
  loading: authentication.loading,
  user: isEmpty(authentication.user) ? (JSON.parse(sessionStorage.getItem('user')) || {}) : authentication.user
});

const mapDispatchToProps = dispatch => ({
  getDishesRequest: () => dispatch({type: types.GET_DISHES_REQUEST}),
  getDishesSuccess: dishes => dispatch({type: types.GET_DISHES_SUCCESS, dishes}),
  getDishesFailure: error => dispatch({type: types.GET_DISHES_FAILURE, error})
})


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
