import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { loadAllGroups } from "../../utils/groups";
import GroupDetails from "./GroupDetails";
import * as groupActions from "../../store/groups";
import './Groups.css'

const GroupsPage = () => {
    const groups = useSelector(groupActions.selectGroup);
    const dispatch = useDispatch();

    useEffect(() => {
        const getGroups = async () => {
            await dispatch(loadAllGroups());
        }
        getGroups();
    }, [dispatch])
    const navigate = useNavigate();

    return (
        <div id="groups-body">
            <div id="groups-links-container">
                <h2 id="groupspage-events-link" onClick={() => navigate('/events')}>Events</h2>
                <h2 id="groupspage-groups-link">Groups</h2>
            </div>
            <h3>Groups in Dubs Family Meetup</h3>
            {groups?.allIds.map(id => (
                <div className="group-details-container" key={`groups:${id}`} onClick={() => navigate(`/groups/${id}`)}>
                    <GroupDetails group={groups.entities[+id]} />
                </div>
            ))}
        </div>
    )
};

export default GroupsPage;
