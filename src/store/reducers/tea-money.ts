// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { TeaMoney, DefaultRootStateProps, queryStringParams } from 'types/tea-money';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['teaMoney'] = {
  error: null,
  success: null,
  teaMoneyList: null,
  teaMoneyFdd: null,
  isLoading: false
};

const slice = createSlice({
  name: 'teaMoney',
  initialState,
  reducers: {
    // TO INITIAL STATE
    hasInitialState(state) {
      state.error = null;
      state.success = null;
      state.isLoading = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    startLoading(state) {
      state.isLoading = true;
    },

    finishLoading(state) {
      state.isLoading = false;
    },

    // GET teaMoney
    getTeaMoneySuccess(state, action) {
      state.teaMoneyList = action.payload;
      state.success = null;
    },

    // GET teaMoney FDD
    getTeaMoneyFddSuccess(state, action) {
      state.teaMoneyFdd = action.payload;
      state.success = null;
    },

    // POST teaMoney
    createTeaMoneySuccess(state, action) {
      state.success = 'Tea Money successfully';
    },

    // PUT teaMoney
    updateTeaMoneySuccess(state, action) {
      state.success = 'Tea Money Update successfully';
    },

    // DELETE teaMoney
    deleteTeaMoneySuccess(state, action) {
      state.success = 'Tea Money Deleted successfully';
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

/**
 * TO INITIAL STATE
 * @returns
 */
export function toInitialState() {
  return async () => {
    dispatch(slice.actions.hasInitialState());
  };
}

export function getTeaMoney(query: queryStringParams) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/home-business-management/tea-money', { params: query });
      dispatch(slice.actions.getTeaMoneySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

export function getTeaMoneyFdd() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/home-business-management/tea-money/fdd');
      dispatch(slice.actions.getTeaMoneyFddSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

export function createTeaMoney(createTeaMoneyProps: TeaMoney) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/v1/home-business-management/tea-money', createTeaMoneyProps);
      dispatch(slice.actions.createTeaMoneySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

export function updateTeaMoney(updateTeaMoneyProps: TeaMoney) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/api/v1/home-business-management/tea-money/${updateTeaMoneyProps?._id}`, updateTeaMoneyProps);
      dispatch(slice.actions.updateTeaMoneySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

export function deleteTeaMoney(teaMoneyId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/api/v1/home-business-management/tea-money/${teaMoneyId}`);
      dispatch(slice.actions.deleteTeaMoneySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}
