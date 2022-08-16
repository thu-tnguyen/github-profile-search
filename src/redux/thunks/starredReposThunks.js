import {
  starredReposLoading,
  starredReposReceived,
  starredReposReceivedWithError,
} from '../reducers/starredReposReducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DEFAULT_ERROR_MSG } from '../../utils/messages';

// default values for getting starred repos
const PAGE_LIMIT = 10; //  select 10 items
const PAGE = 1; // on first page
const SORT_BY = 'created'; // sort by date that user starred a repo
const SORT_DIR = 'desc'; // sort in descending direction

// a thunk for getting user's most recently starred repos, expecting `username`
export const getStarredReposThunk = createAsyncThunk('starredRepos/get', async (username, thunkApi) => {
  // start loading/fetching
  thunkApi.dispatch(starredReposLoading());
  try {
    // get repos that this user starred
    const response = await axios.get(`https://api.github.com/users/${username}/starred`, {
      params: {
        per_page: PAGE_LIMIT,
        page: PAGE,
        sort: SORT_BY,
        direction: SORT_DIR,
      },
    });
    const { data, error } = response;

    // if response data is an array and there's no error
    if (Array.isArray(data) && !error) {
      // return payload
      thunkApi.dispatch(starredReposReceived(data));
    } else {
      // return error message if given, or use default error message
      thunkApi.dispatch(starredReposReceivedWithError(data?.message || DEFAULT_ERROR_MSG));
    }
  } catch (error) {
    // return error message if given, or use default error message
    thunkApi.dispatch(starredReposReceivedWithError(error.response?.data?.message || DEFAULT_ERROR_MSG));
  }
});
