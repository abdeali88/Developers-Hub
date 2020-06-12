import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utility/LoadUser';

//If the localstorage has a token, user is loaded and authenticated on every app component mounting
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: 'USER_LOADED',
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: 'AUTH_ERROR',
    });
  }
};

//Register User
export const register = (formData) => async (dispatch) => {
  const { name, email, password } = formData;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('api/users', body, config);
    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: 'REGISTER_FAIL',
    });
  }
};

//Login User
export const login = (formData) => async (dispatch) => {
  const { email, password } = formData;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('api/auth', body, config);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: 'LOGIN_FAIL',
    });
  }
};

//Logout User
export const logout = () => (dispatch) => {
  dispatch({
    type: 'LOGOUT',
  });

  dispatch({
    type: 'PROFILE_CLEAR_MY',
  });

  dispatch({
    type: 'PROFILE_CLEAR',
  });
};
