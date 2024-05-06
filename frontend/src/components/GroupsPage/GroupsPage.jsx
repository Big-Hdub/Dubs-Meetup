import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { loadAllGroups } from "../../utils/groups";
import GroupDetails from "./GroupDetails";
import './Groups.css'

const GroupsPage = () => {
    const dispatch = useDispatch();
    const [groups, setGroups] = useState([])

    useEffect(() => {
        const getGroups = async () => {
            const data = await dispatch(loadAllGroups());
            setGroups(data.Groups)
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
            {groups.map((group) => (
                <div className="group-details-container" key={group.id} onClick={() => navigate(`/groups/${group.id}`)}>
                    <GroupDetails group={group} />
                </div>
            ))}
        </div>
    )
};

export default GroupsPage;
