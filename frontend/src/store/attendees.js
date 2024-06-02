import { createSelector } from '@reduxjs/toolkit';

export const SET_ATTENDEE = 'members/SET_ATTENDEE';
export const DELETE_ATTENDEE = 'members/DELETE_ATTENDEE';
export const SET_ATTENDEES = 'members/SET_ATTENDEES';

export const setAttendee = (attendee) => ({
    type: SET_ATTENDEE,
    attendee
});

export const setAttendees = (attendees) => ({
    type: SET_ATTENDEES,
    attendees
});

export const deleteAttendee = (attendeeId) => ({
    type: DELETE_ATTENDEE,
    attendeeId
});

const selectAttendeesObj = (state) => state.attendees;

export const selectAttendees = createSelector([selectAttendeesObj], (selectAttendeesObj) => ({ ...selectAttendeesObj }))

const initialState = { entities: {}, allIds: [] };

const attendeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ATTENDEE: {
            const newState = structuredClone(state);
            newState.entities[action.attendee.id] = structuredClone(action.attendee);
            if (newState.allIds.indexOf(action.attendee.id) === -1) newState.allIds.push(action.attendee.id);
            return newState;
        }
        case SET_ATTENDEES: {
            const newState = { entities: {}, allIds: [] }
            action.attendees.Attendees.forEach(attendee => {
                newState.entities[attendee.id] = structuredClone(attendee);
                if (newState.allIds.indexOf(attendee.id) === -1) newState.allIds.push(attendee.id)
            });
            return newState;
        }
        case DELETE_ATTENDEE: {
            const newState = structuredClone(state);
            delete newState.entities[action.attendeeId];
            newState.allIds.splice(newState.allIds.indexOf(action.attendeeId), 1);
            return newState;
        }
        default: return state;
    }
}

export default attendeeReducer;
