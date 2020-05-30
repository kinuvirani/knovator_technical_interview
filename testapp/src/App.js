import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Registration from './Components/Registration/Registration'
import Login from './Components/Login/Login'
import Post from './Components/Post/Post'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route component={Registration} path='/register'/>
        <Route component={Login} path='/login'/>
        <Route component={Post} path='/post'/>
      </Router>
    </div>
  );
};

export default App;
