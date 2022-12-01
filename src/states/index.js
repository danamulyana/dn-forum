import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadsReducer from './thread/reducer';
import usersReducer from './users/reducer';
import CategoriesReducer from './categories/reducer';
import threadDetailReducer from './threadDetail/reducer';
import leaderboardReducer from './leaderboard/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
    threads: threadsReducer,
    categories: CategoriesReducer,
    threadDetail: threadDetailReducer,
    leaderboard: leaderboardReducer,
  },
});

export default store;
