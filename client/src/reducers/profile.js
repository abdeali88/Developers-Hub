const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'PROFILE_CREATE':
    case 'PROFILE_GET_ID':
    case 'PROFILE_GET':
    case 'PROFILE_EDUCATION_ADD':
    case 'PROFILE_EXPERIENCE_ADD':
    case 'PROFILE_EDUCATION_DELETE':
    case 'PROFILE_EXPERIENCE_DELETE':
      return { ...state, profile: action.payload, loading: false };

    case 'PROFILE_GET_ALL':
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };

    case 'PROFILE_GET_REPOS':
      return { ...state, repos: action.payload, loading: false };

    case 'NO_REPOS':
      return {
        ...state,
        repos: [],
      };

    case 'PROFILE_ERROR':
      return {
        ...state,
        error: action.payload,
        profile: null,
        loading: false,
      };

    case 'PROFILE_CLEAR':
      return {
        ...state,
        profile: null,
        repos: [],
      };

    default:
      return state;
  }
}
