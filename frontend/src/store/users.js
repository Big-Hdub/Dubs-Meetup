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
            const newState = structuredClone(state);
            newState.entities[action.user.id] = structuredClone(action.user);
            if (newState.allIds.indexOf(action.user.id) < 0) newState.allIds.push(action.user.id);
            return newState;
        }
        case SET_USERS: {
            const newState = structuredClone(state)
            action.users.forEach(user => {
                newState.entities[user.id] = structuredClone(user);
                if (newState.allIds.indexOf(user.id) < 0) newState.allIds.push(user.id)
            });
            return newState;
        }
        case DELETE_USER: {
            const newState = structuredClone(state);
            delete newState.entities[action];
            newState.allIds.splice(newState.allIds.indexOf(action), 1);
            return newState;
        }
        default: return state;
    }
}

export default userReducer;
