import { setAlert } from './alert';
import api from '../utility/api';

//Get all posts
export const getAllPosts = () => async (dispatch) => {
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

    dispatch(setAlert('Post Deleted!!', 'success'));
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

    dispatch(setAlert('Post Created', 'success'));
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

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/${id}`);

    dispatch({
      type: 'POST_GET',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/comment/${postId}`, formData);

    dispatch({
      type: 'COMMENT_ADD',
      payload: res.data,
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: 'COMMENT_REMOVE',
      payload: commentId,
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
