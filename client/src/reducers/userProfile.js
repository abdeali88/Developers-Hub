const initialState = {
  myProfile: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'PROFILE_GET_MY':
    case 'PROFILE_CREATE':
    case 'PROFILE_EXPERIENCE_ADD':
    case 'PROFILE_EDUCATION_ADD':
    case 'PROFILE_EXPERIENCE_DELETE':
    case 'PROFILE_EDUCATION_DELETE':
      return { ...state, myProfile: action.payload, error: {}, loading: false };

    case 'PROFILE_CLEAR_MY':
      return {
        ...state,
        myProfile: null,
        error: {},
        loading: false,
      };

    case 'PROFILE_ERROR_MY':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
