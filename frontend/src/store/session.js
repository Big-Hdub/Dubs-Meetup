import { csrfFetch } from './csrf'

export const SET_SESSION = 'session/SET_SESSION';
export const DELETE_SESSION = 'session/DELETE_SESSION';
const initialState = { user: null }

const setSession = (user) => ({
    type: SET_SESSION,
    user
});

const deleteSession = () => ({
    type: DELETE_SESSION
});

export const login = (data) => async (dispatch) => {
    const res = await csrfFetch('/api/session',
        {
            method: 'POST',
            body: JSON.stringify(data)
        });
    if (res.ok) {
        const data = await res.json();
        dispatch(setSession(data.user));
        return data;
    } else return await res.json();
};

export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session',
        {
            method: 'DELETE',
        })
    if (res.ok) {
        const message = await res.json();
        dispatch(deleteSession());
        return message;
    }
};

export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');
    if (res.ok) {
        const data = await res.json();
        dispatch(setSession(data.user));
        return data;
    }
}

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
}

export default sessionReducer;
