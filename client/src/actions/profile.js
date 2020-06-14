import { setAlert } from './alert';
import api from '../utility/api';

//load the profiles of all users
export const getAllProfiles = () => async (dispatch) => {
  dispatch({
    type: 'PROFILE_REPO_CLEAR',
  });

  try {
    const res = await api.get('/profile');

    dispatch({
      type: 'PROFILE_GET_ALL',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//load the profiles of user by Id
export const getProfileById = (user_id) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/user/${user_id}`);

    dispatch({
      type: 'PROFILE_GET_ID',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//get github repos of user
export const getRepos = (githubusername) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/github/${githubusername}`);

    dispatch({
      type: 'PROFILE_GET_REPOS',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
