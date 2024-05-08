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
    const res = await csrfFetch(`/api/groups/${groupId}`);
    const data = await res.json();
    const group = { ...data };
    delete group.Venues
    if (res.ok) await dispatch(groupActions.setGroup(group));
    return data;
}

const getEvents = async (groupId, dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}/events`);
    const data = await res.json();
    if (res.ok) await dispatch(eventActions.setEvents(data.Events));
    return data;
}

const getMembers = async (groupId, dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}/members`);
    const data = await res.json();
    if (res.ok) await dispatch(memberActions.setMembers(data.Members));
}

export const loadGroupDetails = (groupId) => async (dispatch) => {
    const group = await getGroup(groupId, dispatch);
    const events = await getEvents(groupId, dispatch);
    const members = await getMembers(groupId, dispatch);
    return { ...group, events: events, members }
}
