import { useDispatch, useSelector } from "react-redux";
import * as eventActions from "../../store/events";
import { loadEvents } from "../../utils/events";
import { useNavigate } from "react-router-dom";
import EventDetails from "../EventDetails";
import { useEffect } from "react";
import './Events.css'

const EventsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const events = useSelector(eventActions.selectEvents);

    useEffect(() => {
        const loader = async () => {
            await dispatch(loadEvents())
        };
        loader();
    }, [dispatch])

    return (
        <div id="events-body">
            <div id="events-links-container">
                <h2 id="eventspage-events-link">Events</h2>
                <h2 id="eventspage-groups-link" onClick={() => navigate('/groups')}>Groups</h2>
            </div>
            <h3>Events in Dubs Family Meetup</h3>
            {events.allIds.map((id) => (
                <div className="event-details-container" key={`event:${id}`} onClick={() => navigate(`/events/${id}`)}>
                    <EventDetails eventId={id} />
                </div>
            ))}
        </div>
    )
};

export default EventsPage;
