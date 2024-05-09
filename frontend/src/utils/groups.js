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
        console.log('error in group');
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
        console.log('error in event');
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
        console.log('error in member');
        return;
    }
}

export const loadGroupDetails = (groupId) => (dispatch) => {
    getGroup(groupId, dispatch);
    getEvents(groupId, dispatch);
    getMembers(groupId, dispatch);
    return
}
