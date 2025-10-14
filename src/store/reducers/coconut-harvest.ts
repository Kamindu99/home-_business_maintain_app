// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { CoconutHarvest, DefaultRootStateProps, queryStringParams } from 'types/coconut-harvest';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['coconutHarvest'] = {
  error: null,
  success: null,
  coconutHarvestList: null,
  coconutHarvestFdd: null,
  isLoading: false
};

const slice = createSlice({
  name: 'coconutHarvest',
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

    // GET coconutHarvest
    getCoconutHarvestSuccess(state, action) {
      state.coconutHarvestList = action.payload;
      state.success = null;
    },

    // GET coconutHarvest FDD
    getCoconutHarvestFddSuccess(state, action) {
      state.coconutHarvestFdd = action.payload;
      state.success = null;
    },

    // POST coconutHarvest
    createCoconutHarvestSuccess(state, action) {
      state.success = 'Coconut Harvest successfully';
    },

    // PUT coconutHarvest
    updateCoconutHarvestSuccess(state, action) {
      state.success = 'Coconut Harvest Update successfully';
    },

    // DELETE coconutHarvest
    deleteCoconutHarvestSuccess(state, action) {
      state.success = 'Coconut Harvest Deleted successfully';
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

export function getCoconutHarvest(query: queryStringParams) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/home-business-management/coconut-harvest', { params: query });
      dispatch(slice.actions.getCoconutHarvestSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

export function getCoconutHarvestByDate(query: queryStringParams) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/home-business-management/coconut-harvest/by-date', { params: query });
      dispatch(slice.actions.getCoconutHarvestSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

export function getCoconutHarvestFdd() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/home-business-management/coconut-harvest/fdd');
      dispatch(slice.actions.getCoconutHarvestFddSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

export function createCoconutHarvest(createCoconutHarvestProps: CoconutHarvest) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/v1/home-business-management/coconut-harvest', createCoconutHarvestProps);
      dispatch(slice.actions.createCoconutHarvestSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

export function createSingleCoconutHarvest(createCoconutHarvestProps: CoconutHarvest) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/v1/home-business-management/coconut-harvest/single-add', createCoconutHarvestProps);
      dispatch(slice.actions.createCoconutHarvestSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

export function updateCoconutHarvest(updateCoconutHarvestProps: CoconutHarvest) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(
        `/api/v1/home-business-management/coconut-harvest/${updateCoconutHarvestProps?._id}`,
        updateCoconutHarvestProps
      );
      dispatch(slice.actions.updateCoconutHarvestSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

export function deleteCoconutHarvest(coconutHarvestId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/api/v1/home-business-management/coconut-harvest/${coconutHarvestId}`);
      dispatch(slice.actions.deleteCoconutHarvestSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}
