import { createSelector } from '@reduxjs/toolkit';

export const SET_USER = 'users/SET_USER';
export const DELETE_USER = 'users/DELETE_USER';
export const SET_USERS = 'users/SET_USERS';

export const setUser = (user) => ({
    type: SET_USER,
    user
});

export const setUsers = (users) => ({
    type: SET_USERS,
    users
});

export const deleteUser = (userId) => ({
    type: DELETE_USER,
    userId
});

const selectUsersObj = (state) => state.users;

export const selectUsers = createSelector([selectUsersObj], (selectUsersObj) => ({ ...selectUsersObj }))

const initialState = { entities: {}, allIds: [] };

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return { ...state, entities: { ...state.entities, action }, allIds: [...state.allIds, action.id] }
        }
        case SET_USERS: {
            return { ...state, entities: { ...state.entities, ...action }, allIds: [...state.allIds, ...action.map(user => user.id)] }
        }
        case DELETE_USER: {
            const newState = { ...state };
            delete newState.entities[action];
            newState.allIds.splice(newState.allIds.indexOf(action), 1);
            return newState;
        }
        default: return state;
    }
}

export default userReducer;
