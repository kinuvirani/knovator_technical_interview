import {ADD_POST} from '../Actions/actionType';

const init_state = {
  posts: [
    {
      title: 'test title1',
      body: 'test body1'
    },
    {
      title: 'test title2',
      body: 'test body2'
    }
  ],
  new_post: {}
};

export default (state=init_state, action) => {
  switch (action.type) {
    case ADD_POST:
      state.posts.push(action.payload);
      return Object.assign({}, state, {posts: state.posts});
    default:
      return state;
  }
};