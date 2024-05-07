import { createSelector } from '@reduxjs/toolkit';

export const SET_GROUP = 'groups/SET_GROUP';
export const DELETE_GROUP = 'groups/DELETE_GROUP';
export const SET_GROUPS = 'groups/SET_GROUPS';

export const setGroup = (group) => ({
    type: SET_GROUP,
    group
});

export const setGroups = (groups) => ({
    type: SET_GROUPS,
    groups
});

export const deleteGroup = (groupId) => ({
    type: DELETE_GROUP,
    groupId
});

const selectGroupsObj = (state) => state?.groups;

export const selectGroups = createSelector([selectGroupsObj], (selectGroupsObj) => ({ ...selectGroupsObj }))

const initialState = { entities: {}, allIds: [] };

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GROUP: {
            return { ...state, entities: { ...state.entities, ...action.group }, allIds: [...state.allIds, action.group.id] }
        }
        case SET_GROUPS: {
            const newState = { ...state, allIds: [] }
            action.groups.forEach(group => {
                newState.entities[group.id] = group;
                newState.allIds.push(group.id)
            });
            return newState;
        }
        case DELETE_GROUP: {
            const newState = { ...state };
            delete newState.entities[action];
            newState.allIds.splice(newState.allIds.indexOf(action), 1);
            return newState;
        }
        default: return state;
    }
}

export default groupReducer;
