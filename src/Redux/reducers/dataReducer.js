import {
  LOADING_DATA,
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  ADD_POST,
  SET_POST,
  SUBMIT_POST
} from "../types";

const initialState = {
  loading: false,
  posts: [],
  post: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload
      };

    case SET_POST:
      return {
        ...state,
        post: action.payload
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        post => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post = action.payload;
      }
      return {
        ...state
      };
    case DELETE_POST:
      let index2 = state.posts.findIndex(
        post => post.postId === action.payload
      );
      state.posts.splice(index2, 1);
      return {
        ...state
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case SUBMIT_POST:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments]
        }
      };
    default:
      return state;
  }
}
