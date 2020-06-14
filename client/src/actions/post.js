import { setAlert } from './alert';
import api from '../utility/api';

//Get all posts
export const getAllPosts = () => async (dispatch) => {
  dispatch({
    type: 'PROFILE_REPO_CLEAR',
  });
  try {
    const res = await api.get('/posts');

    dispatch({
      type: 'POST_GET_ALL',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Add a like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/like/${postId}`);

    dispatch({
      type: 'UPDATE_LIKES',
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Remove Like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/unlike/${postId}`);

    dispatch({
      type: 'UPDATE_LIKES',
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Delete Post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await api.delete(`/posts/${postId}`);

    dispatch({
      type: 'POST_DELETE',
      payload: postId,
    });

    dispatch(setAlert('POST DELETED!', 'success'));
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Add Post
export const addPost = (text) => async (dispatch) => {
  try {
    const res = await api.post(`/posts`, text);

    dispatch({
      type: 'POST_CREATE',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: {
        message: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
