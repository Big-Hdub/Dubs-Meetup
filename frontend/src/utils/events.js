// import * as memberActions from '../store/members';
import * as attendeeActions from '../store/attendees';
import * as venueActions from '../store/venues';
import * as groupActions from '../store/groups';
import * as eventActions from '../store/events';
import { csrfFetch } from '../store/csrf';

const getEvent = async (eventId, dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}`);
    const data = await res.json();
    const { id, groupId, venueId, name, type, capacity, price, description,
        startDate, endDate, EventImages, numAttending } = data;
    if (res.ok) {
        await dispatch(eventActions.setEvent({
            id, groupId, venueId, name, type, capacity, price,
            description, startDate, endDate, EventImages, numAttending
        }));
        const res = await csrfFetch(`/api/groups/${groupId}`);
        const data = await res.json();
        if (res.ok) {
            await dispatch(venueActions.setVenues(data.Venues));
            let newData = { ...data };
            newData.Venues = newData.Venues?.map(venue => venue?.id);
            newData.Organizer = newData.Organizer.id;
            newData.preview = newData.GroupImages.find(image => image.preview === true).url;
            newData.GroupImages = newData.GroupImages.map(image => image = image.id)
            await dispatch(groupActions.setGroup(newData));
        }
    }
    return data;
};

const getAttendees = async (eventId, dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}/attendees`);
    const data = await res.json();
    if (res.ok) await dispatch(attendeeActions.setAttendees(data))
    return data;
};

export const loadEventDetails = (eventId) => (dispatch) => {
    getEvent(eventId, dispatch);
    getAttendees(eventId, dispatch);
    return;
};

const getEvents = async (dispatch) => {
    const res = await csrfFetch('/api/events');
    const data = await res.json();
    if (res.ok) await dispatch(eventActions.setEvents(data.Events));
    return data;
};

export const loadEvents = () => (dispatch) => {
    getEvents(dispatch);
    return;
};

const newEvent = async (data) => {
    const res = await csrfFetch(`/api/groups/${data.groupId}/events`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    const event = await res.json();
    return event;
};

const newEventImage = async (data, eventId) => {
    const res = await csrfFetch(`/api/events/${eventId}/images`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    const image = await res.json();
    return image;
};

export const createEvent = (eventData, imageData) => async dispatch => {
    const event = await newEvent(eventData, dispatch);
    await newEventImage(imageData, event.id, dispatch)
    return event;
};
