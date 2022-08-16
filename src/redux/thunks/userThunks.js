import { userLoading, userReceived, userReceivedWithError } from '../reducers/userReducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DEFAULT_ERROR_MSG } from '../../utils/messages';

// a thunk for getting user info, expecting `username`
export const getUserThunk = createAsyncThunk('user/get', async (username, thunkApi) => {
  // start loading/fetching
  thunkApi.dispatch(userLoading());
  try {
    const response = await axios.get('https://api.github.com/users/' + username);
    const { data, error } = response;
    if (data && !error) {
      // return payload
      thunkApi.dispatch(userReceived(data));
    } else {
      // return error message if given, or use default error message
      thunkApi.dispatch(userReceivedWithError(data?.message || DEFAULT_ERROR_MSG));
    }
  } catch (error) {
    // return error message if given, or use default error message
    thunkApi.dispatch(userReceivedWithError(error.response?.data?.message || DEFAULT_ERROR_MSG));
  }
});
