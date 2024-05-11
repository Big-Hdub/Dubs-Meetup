import * as memberActions from '../store/members';
import * as groupActions from '../store/groups';
import * as eventActions from '../store/events';
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
        const data = await res.json();
        const group = { ...data };
        delete group.Venues
        if (res.ok) await dispatch(groupActions.setGroup(group));
        return data;
    } catch {
        return;
    }
}

const getEvents = async (groupId, dispatch) => {
    try {
        const res = await csrfFetch(`/api/groups/${groupId}/events`);
        const data = await res.json();
        if (res.ok) await dispatch(eventActions.setEvents(data.Events));
        return data;
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

export const loadGroupDetails = (groupId) => (dispatch) => {
    getGroup(groupId, dispatch);
    getEvents(groupId, dispatch);
    getMembers(groupId, dispatch);
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
    group.preview = image;
    await dispatch(groupActions.setGroup(group))
    return group;
};


export const loadUsersGroups = () => async dispatch => {
    const res = await csrfFetch('/api/groups/current');
    const data = await res.json();
    if (res.ok) dispatch(groupActions.setGroups(data.Groups));
    return data;
}
