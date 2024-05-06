import { createSelector } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

export const SET_SESSION = 'session/SET_SESSION';
export const DELETE_SESSION = 'session/DELETE_SESSION';

const setSession = (user) => ({
    type: SET_SESSION,
    user
});

const deleteSession = () => ({
    type: DELETE_SESSION
});

export const login = (loginData) => async (dispatch) => {
    const res = await csrfFetch('/api/session',
        {
            method: 'POST',
            body: JSON.stringify(loginData)
        });
    const data = await res.json();
    if (res.ok) dispatch(setSession(data.user));
    return data;
};

export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', { method: 'DELETE' });
    const message = await res.json();
    if (res.ok) dispatch(deleteSession());
    return message;
};

export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');
    const data = await res.json();
    if (res.ok) dispatch(setSession(data.user));
    return data;
};

export const signup = (signupData) => async (dispatch) => {
    const res = await csrfFetch('/api/users', { method: 'POST', body: JSON.stringify(signupData) });
    const data = await res.json();
    if (res.ok) dispatch(setSession(data.user));
    return data;
};

const selectSession = (state) => state.session;

export const selectSessionUser = createSelector([selectSession], (selectSession) => ({ ...selectSession }));

const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION: {
            return { ...state, user: action.user }
        }
        case DELETE_SESSION: {
            return { ...state, user: null }
        }
        default:
            return state;
    }
};

export default sessionReducer;
