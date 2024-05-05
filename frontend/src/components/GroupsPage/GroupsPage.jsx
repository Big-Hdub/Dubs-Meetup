import { useNavigate } from "react-router-dom";
import GroupDetails from "./GroupDetails";
import './Groups.css'


const GroupsPage = () => {
    const groups = [{ id: 1, name: "Group Name" }, { id: 2, name: "Group Name" }, { id: 3, name: "Group Name" }, { id: 4, name: "Group Name" }, { id: 5, name: "Group Name" }];
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
