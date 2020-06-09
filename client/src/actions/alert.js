import uuid from 'uuid';

export const setAlert = (message, alertType) => (dispatch) => {
  dispatch({
    type: 'SET_ALERT',
    payload: {
      id: uuid.v4(),
      message: message,
      alertType: alertType,
    },
  });
};

export const removeAlert = (id) => (dispatch) => {
  dispatch({
    type: 'REMOVE_ALERT',
    payload: {
      id: id,
    },
  });
};
