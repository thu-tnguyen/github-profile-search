import { createSlice } from '@reduxjs/toolkit';

// use a "state machine" approach for loading state (i.e. idle -> pending -> succeed/fail)
const initialState = {
  loading: 'idle',
  error: '',
  data: [],
};

// redux slice list of a user's recently starred repos
export const starredReposSlice = createSlice({
  name: 'starredReposSlice',
  initialState,
  reducers: {
    starredReposLoading: (state) => {
      // if not already loading a user, start loading
      if (state.loading !== 'pending') {
        state.loading = 'pending';

        // reset data for new data
        state.data = initialState.data;
      }
    },
    starredReposReceived: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'succeed';

        // keep only needed fields, flatten data, and change naming (to camelcase)
        state.data = action.payload.map((repo) => ({
          id: repo.id,
          fullName: repo.full_name,
          ownerName: repo.owner.name,
          ownerAvatarUrl: repo.owner.avatar_url,
          url: repo.html_url,
        }));
      }
    },
    starredReposReceivedWithError: (state, action) => {
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
export const { starredReposLoading, starredReposReceived, starredReposReceivedWithError } = starredReposSlice.actions;

export default starredReposSlice.reducer;
