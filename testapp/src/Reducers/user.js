import {REGISTRATION, LOGIN, LOGOUT} from '../Actions/actionType';

const init_state = {
  data:{},
  msg: '',
  token:''
};

export default (state=init_state, action) => {
  switch (action.type) {
    case REGISTRATION:
      return Object.assign({}, state, {msg: 'Registration Successful'});
    case LOGIN:
      return Object.assign({}, state, {data: action.payload, token: action.payload.token});
    case LOGOUT:
      return Object.assign({}, state, {data: {}, token: ''});
    default:
      return state;
  }
};