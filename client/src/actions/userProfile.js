import { setAlert } from './alert';
import axios from 'axios';

//load profile of the user loggedIn
export const getMyProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: 'PROFILE_GET_MY',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR_MY',
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//create or edit profile
export const createProfile = (edit = false, formData, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(formData);
  try {
    const res = await axios.post('api/profile', body, config);
    dispatch({
      type: 'PROFILE_CREATE',
      payload: res.data,
    });

    if (!edit) {
      history.push('/dashboard');
    }

    dispatch(
      setAlert(edit ? 'Profile Updated!' : 'Profile Created', 'success')
    );
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: 'PROFILE_ERROR_MY',
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//ADD Experience
export const addExperience = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(formData);
  try {
    const res = await axios.put('api/profile/experience', body, config);
    dispatch({
      type: 'PROFILE_EXPERIENCE_ADD',
      payload: res.data,
    });

    history.push('/dashboard');

    dispatch(setAlert('Profile Experience Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: 'PROFILE_ERROR_MY',
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//ADD EDUCATION
export const addEducation = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(formData);
  try {
    const res = await axios.put('api/profile/education', body, config);
    dispatch({
      type: 'PROFILE_EDUCATION_ADD',
      payload: res.data,
    });

    history.push('/dashboard');

    dispatch(setAlert('Profile Education Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: 'PROFILE_ERROR_MY',
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
    const res = await axios.delete(`api/profile/education/${edu_id}`);
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
      type: 'PROFILE_ERROR_MY',
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
    const res = await axios.delete(`api/profile/experience/${exp_id}`);
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
      type: 'PROFILE_ERROR_MY',
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
      await axios.delete('api/profile');
      dispatch({
        type: 'PROFILE_CLEAR_MY',
      });

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
