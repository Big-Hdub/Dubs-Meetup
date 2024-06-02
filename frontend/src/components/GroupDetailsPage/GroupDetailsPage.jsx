import OpenModalButton from "../OpenModalButton/OpenModalButton";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { requestMembership } from "../../utils/membership";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadGroupDetails } from "../../utils/groups";
import * as sessionActions from "../../store/session";
import * as memberActions from "../../store/members";
import * as groupActions from "../../store/groups";
import * as eventActions from "../../store/events";
import DeleteGroupModal from "./DeleteGroupModal";
import { useEffect, useState } from "react";
import EventDetails from "../EventDetails";
import './Group.css';
import MemberListModal from "./MemberListModal";

const GroupDetailsPage = () => {
    document.querySelector('title').innerText = 'Dubs Family Meetup';
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [upcoming, setUpcoming] = useState([]);
    const [past, setPast] = useState([]);
    const [loaded, setLoaded] = useState(0);
    const [requested, setRequested] = useState(false)
    const group = useSelector(groupActions.selectGroup).entities[+id];
    const members = useSelector(memberActions.selectMember).entities;
    const session = useSelector(sessionActions.selectSessionUser).user;
    const events = useSelector(eventActions.selectEvents);

    useEffect(() => {
        const loader = async () => {
            await dispatch(loadGroupDetails(+id));
        }
        loader();
    }, [dispatch, id, requested]);

    useEffect(() => {
        const { entities } = events;
        const filtered = Object.values(entities).filter(event => event.groupId === +id)
        if (loaded < filtered.length) {
            for (let i = 0; i < filtered.length; i++) {
                const event = filtered[i];
                if (past.find(el => el.id === event.id) === undefined && upcoming.find(el => el.id === event.id) === undefined) {
                    new Date(event.startDate).getTime() < new Date().getTime() ?
                        setPast([...past, event]) :
                        setUpcoming([...upcoming, event]);
                    setLoaded(loaded + 1)
                }
            }
        }
    }, [events, past, upcoming, loaded, id]);

    const handleJoin = async () => {
        await requestMembership(+id);
        setRequested(true)
    }
    return (
        <div id="group-details-wrapper">
            <span id="group-breadcrumb-span">
                <p className="group-details-p">{"<"}</p>
                <p id="group-breadcrumb-link" className="group-details-p" onClick={() => navigate('/groups')}>Groups</p>
            </span>
            <div id="group-details-header">
                <img id="group-details-header-image" src={group?.preview} />
                <div id="group-details-header-wrapper">
                    <div id="group-details-header-info">
                        <h1 id="group-details-h1">{group?.name}</h1>
                        <p className="group-details-p">{group?.city}, {group?.state}</p>
                        <span>
                            <p className="group-details-p">{group?.numMembers}</p>
                            {(session !== null) ?
                                <OpenModalMenuItem
                                    itemText="Members"
                                    members={members}
                                    classname=" group-details-p members-link"
                                    modalComponent={<MemberListModal members={members} session={session} groupId={group?.id} />} /> :
                                <p className="group-details-p">Members</p>}
                            <p className="group-details-p centered-dot">.</p>
                            <p className="group-details-p">{group?.private ? "Private" : "Public"}</p>
                        </span>
                        {group?.organizerId && members[+group.organizerId] && <p className="group-details-p">Organized by: {members[+group.organizerId].firstName} {members[+group.organizerId].lastName}</p>}
                    </div>
                    {!(session === null) && <div id="group-details-buttons-wrapper">
                        {!members[session.id] && <button id="join-group-button" onClick={handleJoin}>Join this group</button>}
                        {members[session.id]?.Membership.status === "pending" && <p className="group-details-p">Membership pending</p>}
                        {members[session.id]?.Membership.status === "Organizer" && <div id="group-details-action-buttons-wrapper">
                            <button id="action-create-button" className="group-details-action-buttons" onClick={() => navigate('/events/create', { state: { group } })}>Create event</button>
                            <button className="group-details-action-buttons" onClick={() => navigate(`/groups/${group?.id}/update`)}>Update</button>
                            <OpenModalButton classname="group-details-action-buttons" buttonText="Delete" modalComponent={<DeleteGroupModal group={group} navigate={navigate} />} />
                        </div>}
                    </div>}
                </div>
            </div>
            <div id="group-details-body">
                <h2 className="group-details-h2">Organizer</h2>
                <p className="group-details-p">{group?.Organizer?.firstName} {group?.Organizer?.lastName}</p>
                <h2 className="group-details-h2">What we&apos;re about</h2>
                <p className="group-details-p">{group?.about}</p>
                {upcoming.length > 0 &&
                    <div id="upcoming-events-wrapper">
                        <h2 className="group-details-h2">Upcoming Events ({upcoming.length})</h2>
                        {upcoming.sort((a, b) =>
                            new Date(a.startDate).getTime()
                            - new Date(b.startDate).getTime())
                            .map(event => {
                                return (<div
                                    key={`upcomingId:${event.id}`}
                                    className="group-page-event-containers"
                                    onClick={() => navigate(`/events/${event.id}`)}>
                                    <EventDetails eventId={event.id} />
                                </div>)
                            })}
                    </div>
                }
                {past.length > 0 &&
                    <div id="past-events-wrapper">
                        <h2 className="group-details-h2">Past Events ({past.length})</h2>
                        {past.sort((a, b) =>
                            new Date(b.startDate).getTime()
                            - new Date(a.startDate).getTime())
                            .map(event => {
                                return (<div
                                    key={`pastId:${event.id}`}
                                    className="group-page-event-containers"
                                    onClick={() => navigate(`/events/${event.id}`)}>
                                    <EventDetails eventId={event.id} />
                                </div>)
                            })}
                    </div>
                }
            </div>
        </div >
    )
};

export default GroupDetailsPage;
