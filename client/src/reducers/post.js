const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'POST_GET_ALL':
      return { ...state, posts: action.payload, loading: false };

    case 'UPDATE_LIKES':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload }
            : post
        ),
        loading: false,
      };

    case 'POST_CREATE':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };

    case 'POST_DELETE':
      return {
        ...state,
        posts: state.posts.filter((post) => action.payload !== post._id),
        loading: false,
      };

    case 'POST_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
