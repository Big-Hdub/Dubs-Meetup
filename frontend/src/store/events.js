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
            const newState = structuredClone(state);
            newState.entities[action.event.id] = structuredClone(action.event);
            if (newState.allIds.indexOf(action.event.id) < 0) newState.allIds.push(action.event.id);
            return newState;
        }
        case SET_EVENTS: {
            const newState = structuredClone(state)
            action.events.forEach(event => {
                const newEvent = structuredClone(event);
                delete newEvent.Group;
                newState.entities[event.id] = structuredClone(newEvent);
                if (newState.allIds.indexOf(event.id) < 0) newState.allIds.push(event.id)
            });
            return newState;
        }
        case DELETE_EVENT: {
            const newState = structuredClone(state);
            delete newState.entities[action.eventId];
            newState.allIds.splice(newState.allIds.indexOf(action.eventId), 1);
            return newState;
        }
        default: return state;
    }
}

export default eventReducer;
