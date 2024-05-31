import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadEventDetails } from "../../utils/events";
import * as attendeeActions from "../../store/attendees";
import * as sessionActions from "../../store/session";
import * as groupActions from "../../store/groups";
import * as eventActions from "../../store/events";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faMapPin, faCoins } from "@fortawesome/free-solid-svg-icons";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteEventModal from "./DeleteEventModal";
import './Event.css'

const EventDetailsPage = () => {
    document.querySelector('title').innerText = 'Dubs Family Meetup';
    const { id } = useParams();
    const attendees = useSelector(attendeeActions.selectAttendees);
    const session = useSelector(sessionActions.selectSessionUser);
    const events = useSelector(eventActions.selectEvents).entities;
    const groups = useSelector(groupActions.selectGroup).entities;
    const [hostId, setHostId] = useState(null);
    const [preview, setPreview] = useState('');
    const [host, setHost] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const loader = async () => {
            await dispatch(loadEventDetails(+id, dispatch));
        }
        loader();
    }, [dispatch, id]);

    useEffect(() => {
        let hostId = attendees.allIds.find(id => attendees.entities[id].Attendance.status === 'host');
        setHostId(hostId);
        const host = attendees.entities[hostId];
        setHost(`${host?.firstName} ${host?.lastName}`);
    }, [attendees]);

    useEffect(() => {
        if (events[+id]?.previewImage) {
            events[+id].previewImage.includes("https://dubs-meetup.onrender.com") ?
                setPreview(events[+id].previewImage.slice(32)) :
                setPreview(events[+id].previewImage);
        } else if (events[+id] && events[+id].EventImages?.length) {
            const previewImage = events[+id].EventImages.find(image => image.preview === true).url;
            previewImage.includes("https://dubs-meetup.onrender.com") ?
                setPreview(previewImage.slice(32)) :
                setPreview(previewImage);
        } else {
            setPreview("/api/images/loading");
        }
    }, [events, id])

    const dateConstructor = (data, str) => {
        if (data) {
            const dateTime = new Date(data).toLocaleString().split(", ");
            const [month, day, year] = dateTime[0].split("/");
            const [time, amOrPm] = dateTime[1].split(':00 ')

            return (
                <span className="event-details-date-span">
                    <p className="event-detail-dates-p event-detail-label">{str}</p>
                    <p className="event-detail-dates-p event-detail-dates">{year}-{month}-{day}</p>
                    <p className="event-detail-dates-p centered-dot">.</p>
                    <p className="event-detail-dates-p event-detail-dates">{time} {amOrPm}</p>
                </span>
            )
        }
    }

    return (
        <div id="event-details-page-wrapper">
            <div id="event-details-page-header">
                <span className="event-detail-page-span">
                    <p className="event-details-page-p">{"<"}</p>
                    <p id="event-details-event-breadcrumb" className="event-details-page-p" onClick={() => navigate('/events')}>Events</p>
                </span>
                <h1 id="event-details-page-h1">{events[+id]?.name}</h1>
                <p id="event-details-hosted" className="event-details-page-p">Hosted by: {host}</p>
            </div>
            <div id="event-details-page-main">
                <div id="event-details-main-header">
                    <img id="event-details-main-img" src={preview} />
                    <div id="event-details-main-header-right">
                        <div id="event-details-main-group-container" onClick={() => navigate(`/groups/${events[+id]?.groupId}`)}>
                            <img id="event-details-group-image" src={groups[events[+id]?.groupId]?.preview} />
                            <div id="event-details-main-group-info">
                                <h2 id="event-details-main-group-h2">{groups[events[+id]?.groupId]?.name}</h2>
                                <p id="event-details-main-group-p">{groups[events[+id]?.groupId]?.private ? "Private" : "Public"}</p>
                            </div>
                        </div>
                        <div id="event-details-main-info-container">
                            <div id="event-details-date-container">
                                <span id="event-details-clock-holder"><FontAwesomeIcon className="icons" icon={faClock} /></span>
                                <div id="event-details-dates-holder">
                                    {events[+id] && events[+id].startDate && dateConstructor(events[+id]?.startDate, "START")}
                                    {events[+id] && events[+id].endDate && dateConstructor(events[+id]?.endDate, "END")}
                                </div>
                            </div>
                            <div id="event-details-price-container">
                                <span id="currency"><FontAwesomeIcon className="icons" icon={faCoins} /></span>
                                <p id="event-detail-price">{events[+id]?.price > 0 ? "$ " + events[+id]?.price : "FREE"}</p>
                            </div>
                            <div id="event-details-type-modify-delete-container">
                                <div id="event-details-type-container">
                                    <span id="map-pin"><FontAwesomeIcon className="icons" icon={faMapPin} /></span>
                                    <p id="event-details-type">{events[+id]?.type}</p>
                                </div>
                                <div id="event-details-action-buttons-container">
                                    {session?.user?.id === hostId ? <>
                                        <button className="event-details-action-buttons">Update</button>
                                        <OpenModalButton classname="event-details-action-buttons" buttonText="Delete" modalComponent={<DeleteEventModal event={event ? event : events[+id]} navigate={navigate} />} />
                                    </> : <></>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="event-details-main-body">
                    <h2 id="event-details-main-body-h2">Details</h2>
                    <p className="event-details-page-p">{events[+id]?.description}</p>
                </div>
            </div>
        </div>
    )
};

export default EventDetailsPage;
