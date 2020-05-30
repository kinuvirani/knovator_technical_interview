import {ADD_POST} from '../Actions/actionType'

export const addPost = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADD_POST,
      payload: data
    });
  }
};