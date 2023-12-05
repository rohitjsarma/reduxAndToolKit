const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

const initialState = {
  loading: true,
  data: [],
  error: ""
};

const fetchRequest = () => ({
  type: FETCH_USER_REQUEST
});

const fetchSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user
});

const fetchFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: ""
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload
      };
    default:
      return state;
  }
};

const fetchData = () => {
  return function (dispatch) {
    dispatch(fetchRequest());
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const data = response.data.map((user) => user.id);
        dispatch(fetchSuccess(data));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(fetchFailure(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() =>{ console.log(store.getState())});
store.dispatch(fetchData());
