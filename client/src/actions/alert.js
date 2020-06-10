import { v4 as uuidv4 } from 'uuid';

export const setAlert = (message, alertType) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: 'SET_ALERT',
    payload: {
      id: id,
      message: message,
      alertType: alertType,
    },
  });
  setTimeout(
    () =>
      dispatch({
        type: 'REMOVE_ALERT',
        payload: {
          id: id,
        },
      }),
    5000
  );
};
