import { setAlert } from './alert';
import api from '../utility/api';
import setAuthToken from '../utility/setAuthToken';

//If the localstorage has a token, user is loaded and authenticated on every app component mounting
export const loadUser = () => async (dispatch) => {
  try {
    setAuthToken(localStorage.token);
    const res = await api.get('/auth');

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
    const res = await api.post('/users', body, config);
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

  const body = JSON.stringify({ email, password });
  try {
    const res = await api.post('/auth', body);
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
    type: 'PROFILE_CLEAR',
  });
};
