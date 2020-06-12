import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

import Alert from './components/layouts/Alert';

//custom made private route returns component if authenticated or redirects to login page
import PrivateRoute from './routing/PrivateRoute';

//Every time the App component mounts, it loads user into the state if token is present and valid
import { loadUser } from './actions/auth';

//Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route path='/' exact component={Landing}></Route>
          <section className='container'>
            <Alert />
            <Switch>
              <Route path='/login' component={Login}></Route>
              <Route path='/register' component={Register}></Route>
              <Route path='/profiles' component={Profiles}></Route>
              <Route path='/profile/:user_id' component={Profile}></Route>
              <PrivateRoute
                path='/dashboard'
                component={Dashboard}
              ></PrivateRoute>
              <PrivateRoute
                path='/create-profile'
                component={CreateProfile}
              ></PrivateRoute>
              <PrivateRoute
                path='/edit-profile'
                component={EditProfile}
              ></PrivateRoute>
              <PrivateRoute
                path='/add-experience'
                component={AddExperience}
              ></PrivateRoute>
              <PrivateRoute
                path='/add-education'
                component={AddEducation}
              ></PrivateRoute>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
