import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import starredReposReducer from './reducers/starredReposReducer';

// store for all reducers
export const store = configureStore({
  reducer: {
    // user info
    user: userReducer,
    // user's most recently starred repos
    starredRepos: starredReposReducer,
  },
});
