import { useDispatch, useSelector } from "react-redux";
import * as eventActions from "../../store/events";
import { loadEvents } from "../../utils/events";
import { useNavigate } from "react-router-dom";
import EventDetails from "../EventDetails";
import { useEffect, useState } from "react";
import './Events.css'

const EventsPage = () => {
    const events = useSelector(eventActions.selectEvents);
    const [upcoming, setUpcoming] = useState([]);
    const [loaded, setLoaded] = useState(0);
    const [past, setPast] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const loader = async () => {
            await dispatch(loadEvents())
        };
        loader();
    }, [dispatch])

    useEffect(() => {
        const { allIds, entities } = events;
        if (loaded < allIds.length) {
            allIds.forEach(id => {
                const event = entities[id];
                if (past.find(el => el.id === event.id) === undefined && upcoming.find(el => el.id === event.id) === undefined) {
                    new Date(event.startDate).getTime() < new Date().getTime() ?
                        setPast([...past, event]) :
                        setUpcoming([...upcoming, event]);
                    setLoaded(loaded + 1)
                }
            });
        }
    }, [events, past, upcoming, loaded])

    return (
        <div id="events-body">
            <div id="events-links-container">
                <h2 id="eventspage-events-link">Events</h2>
                <h2 id="eventspage-groups-link" onClick={() => navigate('/groups')}>Groups</h2>
            </div>
            <h3>Events in Dubs Family Meetup</h3>
            <h2></h2>
            {upcoming.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()).map((event) => (
                <div className="event-details-container" key={`event:${event.id}`} onClick={() => navigate(`/events/${event.id}`)}>
                    <EventDetails eventId={event.id} />
                </div>
            ))}
            {past.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).map((event) => (
                <div className="event-details-container past" key={`event:${event.id}`} onClick={() => navigate(`/events/${event.id}`)}>
                    <EventDetails eventId={event.id} />
                </div>
            ))}
        </div>
    )
};

export default EventsPage;
