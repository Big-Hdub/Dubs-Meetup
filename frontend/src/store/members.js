import { createSelector } from '@reduxjs/toolkit';

export const SET_MEMBER = 'members/SET_MEMBER';
export const DELETE_MEMBER = 'members/DELETE_MEMBER';
export const SET_MEMBERS = 'members/SET_MEMBERS';

export const setMember = (member) => ({
    type: SET_MEMBER,
    member
});

export const setMembers = (members) => ({
    type: SET_MEMBERS,
    members
});

export const deleteMember = (memberId) => ({
    type: DELETE_MEMBER,
    memberId
});

const selectMembersObj = (state) => state.members;

export const selectMember = createSelector([selectMembersObj], (selectMembersObj) => ({ ...selectMembersObj }))

const initialState = { entities: {}, allIds: [] };

const memberReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MEMBER: {
            const newState = { ...state };
            newState.entities[action.member.id] = { ...action.member, ...newState.entities[action.member.id] };
            if (newState.allIds.indexOf(action.member.id) < 0) newState.allIds.push(action.member.id);
            return newState;
        }
        case SET_MEMBERS: {
            const newState = { ...state }
            action.members.forEach(member => {
                newState.entities[member.id] = member;
                if (newState.allIds.indexOf(member.id) < 0) newState.allIds.push(member.id)
            });
            return newState;
        }
        case DELETE_MEMBER: {
            const newState = { ...state };
            delete newState.entities[action.memberId];
            newState.allIds.splice(newState.allIds.indexOf(action.memberId), 1);
            return newState;
        }
        default: return state;
    }
}

export default memberReducer;
