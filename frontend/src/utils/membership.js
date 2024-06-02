import * as memberActions from '../store/members';
// import * as groupActions from '../store/groups';
// import * as eventActions from '../store/events';
// import * as venueActions from '../store/venues';
import { csrfFetch } from '../store/csrf';

export const requestMembership = async (groupId, dispatch) => {
    try {
        const res = await csrfFetch(`/api/groups/${groupId}/membership`, {
            method: 'POST'
        });
        const data = await res.json();
        if (res.ok) await dispatch(memberActions.setMember(data));
        return data;
    } catch {
        return;
    }
};

export const editMembership = async (groupId, member, dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}/membership`, {
        method: 'PUT',
        body: JSON.stringify(member)
    });
    const data = await res.json();
    if (res.ok) {
        const res = await csrfFetch(`/api/groups/${groupId}/members`);
        const data = await res.json();
        if (res.ok) await dispatch(memberActions.setMembers(data.Members));
    }
    return data;
}

export const deleteMembership = async (memberId, groupId, dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}/membership/${memberId}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if (res.ok) await dispatch(memberActions.deleteMember(memberId))
    return data
}
