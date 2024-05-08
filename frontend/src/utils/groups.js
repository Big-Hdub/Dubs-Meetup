import { csrfFetch } from '../store/csrf';
import * as groupActions from '../store/groups';
import * as eventActions from '../store/events';

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

export const loadGroupDetails = (groupId) => async (dispatch) => {
    const group = await getGroup(groupId, dispatch);
    const events = await getEvents(groupId, dispatch);
    return { ...group, events: events }
}
