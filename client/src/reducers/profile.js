const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'PROFILE_GET_ID':
      return { ...state, profile: action.payload, error: {}, loading: false };

    case 'PROFILE_GET_ALL':
      return {
        ...state,
        profiles: action.payload,
        error: {},
        loading: false,
      };

    case 'PROFILE_GET_REPOS':
      return { ...state, repos: action.payload, error: {}, loading: false };

    case 'PROFILE_ERROR_REPOS':
      return {
        ...state,
        error: action.payload,
        repos: [],
        loading: false,
      };

    case 'PROFILE_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case 'PROFILE_CLEAR':
      return {
        ...state,
        profile: null,
        profiles: [],
        repos: [],
        error: {},
        loading: false,
      };
    default:
      return state;
  }
}
