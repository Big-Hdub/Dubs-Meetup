import { createSelector } from '@reduxjs/toolkit';

export const SET_VENUE = 'venues/SET_VENUE';
export const DELETE_VENUE = 'venues/DELETE_VENUE';
export const SET_VENUES = 'venues/SET_VENUES';

export const setVenue = (venue) => ({
    type: SET_VENUE,
    venue
});

export const setVenues = (venues) => ({
    type: SET_VENUES,
    venues
});

export const deleteVenue = (venueId) => ({
    type: DELETE_VENUE,
    venueId
});

const selectVenuesObj = (state) => state?.venues;

export const selectVenues = createSelector([selectVenuesObj], (selectVenuesObj) => ({ ...selectVenuesObj }))

const initialState = { entities: {}, allIds: [] };

const venueReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VENUE: {
            const newState = { ...state };
            newState.entities[action.venue.id] = action.venue;
            if (newState.allIds.indexOf(action.venue.id) < 0) newState.allIds.push(action.venue.id);
            return newState;
        }
        case SET_VENUES: {
            const newState = { ...state }
            action.venues.forEach(venue => {
                newState.entities[venue.id] = venue;
                if (newState.allIds.indexOf(venue.id) < 0) newState.allIds.push(venue.id)
            });
            return newState;
        }
        case DELETE_VENUE: {
            const newState = { ...state };
            delete newState.entities[action.venueId];
            newState.allIds.splice(newState.allIds.indexOf(action.venueId), 1);
            return newState;
        }
        default: return state;
    }
}

export default venueReducer;
