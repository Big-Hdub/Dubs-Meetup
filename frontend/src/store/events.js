import { createSelector } from '@reduxjs/toolkit';

export const SET_EVENT = 'events/SET_EVENT';
export const DELETE_EVENT = 'events/DELETE_EVENT';
export const SET_EVENTS = 'events/SET_EVENTS';

export const setEvent = (event) => ({
    type: SET_EVENT,
    event
});

export const setEvents = (events) => ({
    type: SET_EVENTS,
    events
});

export const deleteEvent = (eventId) => ({
    type: DELETE_EVENT,
    eventId
});

const selectEventsObj = (state) => state.events;

export const selectEvents = createSelector([selectEventsObj], (selectEventsObj) => ({ ...selectEventsObj }))

const initialState = { entities: {}, allIds: [] };

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EVENT: {
            return { ...state, entities: { ...state.entities, action }, allIds: [...state.allIds, action.id] }
        }
        case SET_EVENTS: {
            return { ...state, entities: { ...state.entities, ...action }, allIds: [...state.allIds, ...action.map(event => event.id)] }
        }
        case DELETE_EVENT: {
            const newState = { ...state };
            delete newState.entities[action];
            newState.allIds.splice(newState.allIds.indexOf(action), 1);
            return newState;
        }
        default: return state;
    }
}

export default eventReducer;
