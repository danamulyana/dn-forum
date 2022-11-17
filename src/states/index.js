import authUserReducer from './authUser/reducer';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
});

export default store;
