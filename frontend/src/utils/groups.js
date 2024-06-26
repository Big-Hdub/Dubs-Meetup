import * as memberActions from '../store/members';
import * as groupActions from '../store/groups';
import * as eventActions from '../store/events';
import * as venueActions from '../store/venues';
import { csrfFetch } from '../store/csrf';

export const loadAllGroups = () => async (dispatch) => {
    const res = await csrfFetch('/api/groups');
    const data = await res.json();
    if (res.ok) dispatch(groupActions.setGroups(data.Groups));
    return data;
}

const getGroup = async (groupId, dispatch) => {
    try {
        const res = await csrfFetch(`/api/groups/${groupId}`);
        const group = await res.json();
        group.preview = group.GroupImages.find(image => image.preview === true).url;
        group.Venues = group.Venues.map(venue => venue.id);
        if (res.ok) await dispatch(groupActions.setGroup(group));
        return group;
    } catch {
        return;
    }
}

const getEvents = async (groupId, dispatch) => {
    try {
        const res = await csrfFetch(`/api/groups/${groupId}/events`);
        let events = await res.json();
        if (res.ok) {
            for (let event of events.Events) {
                if (event.Venue) {
                    event.venueId = event.Venue.id
                    await dispatch(venueActions.setVenue(event.Venue));
                    delete event.Venue;
                }
            }
            await dispatch(eventActions.setEvents(events.Events));
        }
        return events;
    } catch {
        return;
    }
}

const getMembers = async (groupId, dispatch) => {
    try {
        const res = await csrfFetch(`/api/groups/${groupId}/members`);
        const data = await res.json();
        if (res.ok) await dispatch(memberActions.setMembers(data.Members));
        return data;
    } catch {
        return;
    }
}

export const loadGroupDetails = (groupId) => async (dispatch) => {
    await getMembers(groupId, dispatch);
    await getMembers(groupId, dispatch);
    await getGroup(groupId, dispatch);
    await getEvents(groupId, dispatch);
    return;
}

const newGroup = async (data) => {
    const res = await csrfFetch('/api/groups', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    const group = await res.json();
    return group;
};

const addGroupImage = async (data, groupId) => {
    const res = await csrfFetch(`/api/groups/${groupId}/images`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    const image = await res.json();
    return image;
};

export const createGroup = (groupData, imageData) => async (dispatch) => {
    const group = await newGroup(groupData);
    const image = await addGroupImage(imageData, group.id);
    group.previewImage = image.url;
    await dispatch(groupActions.setGroup(group));
    return group;
};


export const loadUsersGroups = () => async dispatch => {
    const res = await csrfFetch('/api/groups/current');
    const data = await res.json();
    if (res.ok) dispatch(groupActions.setGroups(data.Groups));
    return data;
}

const updateGroupDb = async (groupData, groupId) => {
    const res = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'PUT',
        body: JSON.stringify(groupData)
    });
    const data = await res.json();
    return data;
};

export const updateGroup = (groupData, imageData, groupId) => async dispatch => {
    const updatedGroup = await updateGroupDb(groupData, groupId);
    const image = await addGroupImage(imageData, groupId);
    updatedGroup.preview = image;
    await dispatch(groupActions.setGroup(updatedGroup));
    return updatedGroup;
}

export const deleteGroup = groupId => async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'DELETE'
    });
    const data = res.json();
    if (res.ok) await dispatch(groupActions.deleteGroup(groupId));
    return data;
};
