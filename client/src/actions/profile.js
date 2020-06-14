import { setAlert } from './alert';
import api from '../utility/api';

//Get profile of the user
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/me');

    dispatch({
      type: 'PROFILE_GET',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//load the profiles of all users
export const getAllProfiles = () => async (dispatch) => {
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
      type: 'NO_REPOS',
    });
  }
};

//create or edit profile
export const createProfile = (edit = false, formData, history) => async (
  dispatch
) => {
  try {
    const res = await api.post('/profile', formData);
    dispatch({
      type: 'PROFILE_CREATE',
      payload: res.data,
    });

    dispatch(
      setAlert(edit ? 'Profile Updated!' : 'Profile Created', 'success')
    );

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//ADD Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const res = await api.put('/profile/experience', formData);
    dispatch({
      type: 'PROFILE_EXPERIENCE_ADD',
      payload: res.data,
    });

    dispatch(setAlert('Experience Added!', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//ADD EDUCATION
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const res = await api.put('/profile/education', formData);
    dispatch({
      type: 'PROFILE_EDUCATION_ADD',
      payload: res.data,
    });

    dispatch(setAlert('Profile Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//DELETE EDUCATION
export const delEducation = (edu_id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/education/${edu_id}`);
    dispatch({
      type: 'PROFILE_EDUCATION_DELETE',
      payload: res.data,
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//DELETE EXPERIENCE
export const delExperience = (exp_id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/experience/${exp_id}`);
    dispatch({
      type: 'PROFILE_EXPERIENCE_DELETE',
      payload: res.data,
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//DELETE ACCOUNT
export const delAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This cannot be UNDONE!')) {
    try {
      await api.delete('/profile');

      dispatch({
        type: 'PROFILE_CLEAR',
      });

      dispatch({
        type: 'ACCOUNT_DELETE',
      });

      dispatch(
        setAlert('Your Account has been permanantly Deleted!', 'success')
      );
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR_MY',
        payload: {
          message: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};
