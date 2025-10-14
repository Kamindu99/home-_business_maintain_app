// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { CoconutMoney, DefaultRootStateProps, queryStringParams } from 'types/coconut-money';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['coconutMoney'] = {
  error: null,
  success: null,
  coconutMoneyList: null,
  coconutMoneyFdd: null,
  isLoading: false
};

const slice = createSlice({
  name: 'coconutMoney',
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

    // GET coconutMoney
    getCoconutMoneySuccess(state, action) {
      state.coconutMoneyList = action.payload;
      state.success = null;
    },

    // GET coconutMoney FDD
    getCoconutMoneyFddSuccess(state, action) {
      state.coconutMoneyFdd = action.payload;
      state.success = null;
    },

    // POST coconutMoney
    createCoconutMoneySuccess(state, action) {
      state.success = 'Coconut Money successfully';
    },

    // PUT coconutMoney
    updateCoconutMoneySuccess(state, action) {
      state.success = 'Coconut Money Update successfully';
    },

    // DELETE coconutMoney
    deleteCoconutMoneySuccess(state, action) {
      state.success = 'Coconut Money Deleted successfully';
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

export function getCoconutMoney(query: queryStringParams) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/home-business-management/coconut-money', { params: query });
      dispatch(slice.actions.getCoconutMoneySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

export function getCoconutMoneyFdd() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/home-business-management/coconut-money/fdd');
      dispatch(slice.actions.getCoconutMoneyFddSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

export function createCoconutMoney(createCoconutMoneyProps: CoconutMoney) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/v1/home-business-management/coconut-money', createCoconutMoneyProps);
      dispatch(slice.actions.createCoconutMoneySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

export function updateCoconutMoney(updateCoconutMoneyProps: CoconutMoney) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/api/v1/home-business-management/coconut-money/${updateCoconutMoneyProps?._id}`, updateCoconutMoneyProps);
      dispatch(slice.actions.updateCoconutMoneySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

export function deleteCoconutMoney(coconutMoneyId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/api/v1/home-business-management/coconut-money/${coconutMoneyId}`);
      dispatch(slice.actions.deleteCoconutMoneySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}
