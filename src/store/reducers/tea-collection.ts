// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { Bookstransfer, DefaultRootStateProps, queryStringParams } from 'types/tea-collection';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['booktransfer'] = {
    error: null,
    success: null,
    bookstransferList: null,
    bookstransferFdd: null,
    isLoading: false
};

const slice = createSlice({
    name: 'bookstransfer',
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

        // GET BOOKS
        getBooksSuccess(state, action) {
            state.bookstransferList = action.payload;
            state.success = null;
        },

        // GET BOOKS FDD
        getBooksFddSuccess(state, action) {
            state.bookstransferFdd = action.payload;
            state.success = null;
        },

        // POST BOOK
        createBookSuccess(state, action) {
            state.success = "Book borrowed successfully";
        },

        // PUT BOOK
        updateBookSuccess(state, action) {
            state.success = "Book borrowed Update successfully";
        },

        // PUT BOOK RETURN
        updateReturnBookSuccess(state, action) {
            state.success = "Book Return successfully";
        },

        // DELETE BOOK
        deleteBookSuccess(state, action) {
            state.success = "Book borrow Deleted successfully";
        },
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
        dispatch(slice.actions.hasInitialState())
    }
}

export function getBookstransfer(query: queryStringParams) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/v1/home-business-management/tea-collection', { params: query });
            dispatch(slice.actions.getBooksSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function getBookstransferFdd() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/v1/home-business-management/tea-collection/fdd');
            dispatch(slice.actions.getBooksFddSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function createBooktransfer(createBookProps: Bookstransfer) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('/api/v1/home-business-management/tea-collection', createBookProps);
            dispatch(slice.actions.createBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function updateBooktransfer(updateBookProps: Bookstransfer) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(`/api/v1/home-business-management/tea-collection/${updateBookProps?._id}`, updateBookProps);
            dispatch(slice.actions.updateBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function updateReturnBooktransfer(bookTransferId: string, bookId: string) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(`/api/v1/home-business-management/tea-collection/return/${bookTransferId}/${bookId}`);
            dispatch(slice.actions.updateReturnBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function deleteBooktransfer(bookId: string) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete(`/api/v1/home-business-management/tea-collection/${bookId}`);
            dispatch(slice.actions.deleteBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}