import api from '../Services/baseService';
import {REGISTRATION, LOGIN, LOGOUT} from '../Actions/actionType'

export const userSignup = (data) => {
  return (dispatch) => {
    return api.post('/save', data).then((response) => {
      dispatch({
        type: REGISTRATION,
        payload: response.data
      })
    }).catch((err) => {
      console.log('Error=========', err);
    });
  }
};

export const userSignin = (data) => {
  return (dispatch) => {
   return api.post('/login', data).then((response) => {
     localStorage.setItem('token',response.data.token);
      dispatch({
        type: LOGIN,
        payload: response.data
      })
    }).catch((err) => {
      console.log('Error=========', err);
    });
  }
};

export const userSignout = () => {
  return (dispatch) => {
   return dispatch({
      type: LOGOUT
    })
  }
};