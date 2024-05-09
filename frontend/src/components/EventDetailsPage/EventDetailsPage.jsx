import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadEventDetails } from "../../utils/events";
import * as attendeeActions from "../../store/attendees";
import * as sessionActions from "../../store/session";
import * as memberActions from "../../store/members";
import * as groupActions from "../../store/groups";
import * as eventActions from "../../store/events";
import { useEffect, useState } from "react";
import './Event.css'

const EventDetailsPage = () => {
    const attendees = useSelector(attendeeActions.selectAttendees);
    const session = useSelector(sessionActions.selectSessionUser).user;
    const members = useSelector(memberActions.selectMember).entities;
    const events = useSelector(eventActions.selectEvents).entities;
    const groups = useSelector(groupActions.selectGroup).entities;
    const [host, setHost] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const loader = async () => {
            await dispatch(loadEventDetails(+id, dispatch));
        }
        loader();
    }, [dispatch, id])

    useEffect(() => {
        let hostId = attendees.allIds.find(id => attendees.entities[id].Attendance.status === 'host');
        const host = attendees.entities[hostId];
        setHost(`${host?.firstName} ${host?.lastName}`);
    }, [groups, members, session, attendees])

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
                    <img id="event-details-main-img" src={events[+id]?.EventImages?.length ? events[+id].EventImages.find(image => image.preview === true) : "/api/images/knights"} />
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
                                <div id="event-details-clock-holder"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="event-details-main-body">
                    <h2 id="event-details-main-body-h2">Details</h2>
                    <p className="event-details-page-p">{events[+id]?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit optio fugiat quam, obcaecati minima sint. Repellat rerum ex, nostrum nam libero delectus asperiores ratione fuga dolore. Quod est suscipit aliquam.
                        Iusto, laborum saepe. Cumque iste nesciunt odio maxime repudiandae ipsum voluptatum, vel aut doloribus facere praesentium quo nobis fuga alias voluptas, doloremque quam sint eaque ex. Ratione laboriosam natus recusandae!
                        Hic ipsum eius minima repellendus recusandae obcaecati dolores soluta, voluptate id molestias impedit nisi, odit magnam, sapiente facilis eligendi ipsam rerum atque dolorem alias at commodi tempore ea. Obcaecati, exercitationem?
                        Enim dolorem aliquid eligendi, maiores recusandae odio incidunt voluptas accusantium, tempore sequi temporibus eos voluptatem earum dolorum eum rem neque amet suscipit. Laboriosam sapiente enim veritatis voluptates beatae inventore quas!
                        Praesentium, animi excepturi! Fuga earum, expedita corporis beatae magni provident repellat reprehenderit inventore non reiciendis magnam quisquam similique voluptatem accusantium libero voluptas necessitatibus, fugiat quos sint ullam quia quo. Delectus!
                        Dolor, ratione eius placeat est ad illo alias minima quibusdam blanditiis, cupiditate expedita incidunt. Ullam non deserunt, impedit accusantium exercitationem laboriosam culpa distinctio in. Nihil praesentium asperiores excepturi harum quidem.</p>
                    <p className="event-details-page-p">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis, voluptatem. Nostrum cum quam nobis repellat odit ratione minima error eaque, doloribus alias nulla. Optio aut in aperiam ratione aspernatur amet!
                        Officia ratione est iusto, odit quo quod minima, ipsum ducimus consequuntur eius, asperiores illo alias. Voluptatum quisquam suscipit quia blanditiis explicabo. Optio aliquid, maiores pariatur quibusdam quam ad nihil aut.
                        Hic officiis tempora sint obcaecati deserunt voluptas non nostrum cumque quo laborum aspernatur debitis qui consequuntur assumenda quae illo beatae, tempore expedita. Pariatur labore perspiciatis reprehenderit impedit rem consectetur modi.
                        Quam odio temporibus expedita earum ut? Itaque, tempora esse labore aut in dolor molestiae sunt illo accusantium autem provident. Delectus, sed quas nemo nostrum autem provident et sunt numquam hic.
                        Laudantium ipsa dolorum facere unde reprehenderit dignissimos tenetur alias quod debitis dolores porro aliquam necessitatibus saepe nam officia libero, earum eligendi atque animi recusandae delectus sed? Fuga voluptate eos atque!
                        Tenetur molestias, vero praesentium impedit optio libero et voluptatibus facilis sint quasi in ipsa ullam, ex repudiandae aliquam doloremque error? Recusandae quam at dolores quae molestias, ipsa nostrum maxime aliquid?</p>
                </div>
            </div>
        </div>
    )
};

export default EventDetailsPage;
