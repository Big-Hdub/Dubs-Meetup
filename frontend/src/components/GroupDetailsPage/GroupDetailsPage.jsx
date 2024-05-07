import { useParams } from "react-router-dom";
import * as groupActions from "../../store/groups";
import { useSelector } from "react-redux"
import './Group.css'

const GroupDetailsPage = () => {
    const { id } = useParams();
    const group = useSelector(groupActions.selectGroups).entities[Number(id)]
    const { organizerId, name, about, type,
        city, state, numMembers, previewImage
    } = group;
    const organizer = organizerId
    console.log(organizer, about, type)
    let url;
    previewImage.includes("https://dubs-meetup.onrender.com") ?
        url = previewImage.slice(32) :
        url = previewImage;

    return (
        <div id="group-details-wrapper">
            <p id="group-breadcrumb-link" className="group-details-p">Groups</p>
            <div id="group-details-header">
                <img id="group-details-header-image" src={url} />
                <div id="group-details-header-wrapper">
                    <div id="group-details-header-info">
                        <h1 id="group-details-h1">{name}</h1>
                        <p className="group-details-p">{city}, {state}</p>
                        <span>
                            <p className="group-details-p">{numMembers}, members </p>
                            <p id="centered-dot" className="group-details-p">.</p>
                            <p className="group-details-p">{group.private ? "Private" : "Public"}</p>
                        </span>
                        <p className="group-details-p">Organized by {organizer}</p>
                    </div>
                    <button id="join-group-button">Join this group</button>
                </div>
            </div>
            <div id="group-details-body">
                <h2 className="group-details-h2">{organizer}</h2>
                <p className="group-details-p">Firstname Lastname</p>
                <h2 className="group-details-h2">What we&apos;re about</h2>
                <p className="group-details-p">{about} Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti in adipisci vel sunt quam quaerat eos enim, incidunt ad molestias. Iusto libero aliquid facilis accusantium sapiente blanditiis architecto consequatur vitae! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex veritatis possimus laudantium quia, quo quos delectus neque iusto magni fugit et quas nisi laboriosam consequatur optio! Fugit quod quas eaque.
                    Voluptate eaque error itaque maiores illum velit quo totam incidunt dolorem, alias excepturi ab! Expedita nihil, exercitationem tenetur sunt at aperiam aut molestias nesciunt corrupti assumenda magni, dolor debitis atque?</p>
                <h2 className="group-details-h2">Upcoming Events</h2>
                <h2 className="group-details-h2">Past Events</h2>
            </div>
        </div >
    )
};

export default GroupDetailsPage;
