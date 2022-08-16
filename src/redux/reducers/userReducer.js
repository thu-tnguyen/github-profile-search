import { createSlice } from '@reduxjs/toolkit';

// use a "state machine" approach for loading state (i.e. idle -> pending -> succeed/fail)
const initialState = {
  loading: 'idle',
  error: '',
  data: {},
};

// redux slice for `user` info
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoading: (state) => {
      // if not already loading a user, start loading
      if (state.loading !== 'pending') {
        state.loading = 'pending';

        // reset data for new user
        state.data = initialState.data;
      }
    },
    userReceived: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'succeed';

        // simplify user data, keep only basic info and renaming properties (i.e. to camelcase, clearer naming)
        const { login, avatar_url, html_url, name, location, bio, public_repos, followers } = action.payload;
        state.data = {
          name,
          location,
          bio,
          followers,
          username: login,
          avatarUrl: avatar_url,
          githubUrl: html_url,
          publicRepos: public_repos,
        };
      }
    },
    userReceivedWithError: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'fail';

        // set error msg
        state.error = action.payload;

        // make sure data is empty
        state.data = initialState.data;
      }
    },
  },
});

// export actions
export const { userLoading, userReceived, userReceivedWithError } = userSlice.actions;

export default userSlice.reducer;
