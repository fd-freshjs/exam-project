import ACTION from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  error: null,
  data: null,
  isAuth: false,
};

function userReducer (state = initialState, action) {
  switch (action.type) {
    case ACTION.AUTH_ACTION_REGISTER:
    case ACTION.AUTH_ACTION_LOGIN:
    case ACTION.AUTH_ACTION_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
        data: null,
        isAuth: false,
      };
    }
    case ACTION.AUTH_ACTION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        data: action.data,
        isAuth: true,
      };
    }
    case ACTION.AUTH_ACTION_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
        data: null,
        isAuth: false,
      };
    }
    case ACTION.AUTH_ACTION_CLEAR:
    case ACTION.CLEAR_USER_STORE: {
      return initialState;
    }
    case ACTION.UPDATE_USER_DATA_SUCCESS: {
      return {
        ...state,
        data: { ...state.data, ...action.data },
        error: null,
        isAuth: true,
      };
    }
    case ACTION.UPDATE_USER_DATA_ERROR: {
      return {
        ...state,
        error: action.error,
        isAuth: false,
      };
    }
    case ACTION.AUTH_ACTION_CLEAR_ERROR:
    case ACTION.CLEAR_USER_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
}

export default userReducer;
