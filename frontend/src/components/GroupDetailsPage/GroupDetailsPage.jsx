import { useParams } from "react-router-dom";
// import * as groupActions from "../../store/groups";
// import * as eventActions from "../../store/events";
// import * as userActions from "../../store/users";
// import * as venueActions from "../../store/venues";
import { useDispatch, useSelector } from "react-redux"
import './Group.css'
import { useEffect, useState } from "react";
import { loadGroupDetails } from "../../utils/groups";
import * as groupActions from "../../store/groups";

const GroupDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [preview, setPreview] = useState('');

    useEffect(() => {
        const loader = async () => {
            await dispatch(loadGroupDetails(Number(id)));
        }
        loader();
    }, [dispatch, id])

    const groupState = useSelector(groupActions.selectGroup).entities[Number(id)];

    useEffect(() => {
        let previewImage;
        if (groupState?.GroupImages?.length) {
            previewImage = groupState.GroupImages.find(image => image.preview === true).url;
        }
        previewImage?.includes("https://dubs-meetup.onrender.com") ?
            setPreview(previewImage.slice(32)) :
            setPreview(previewImage);
    }, [groupState])

    console.log("preview url:", preview, "groupState:", groupState);

    return (
        <div id="group-details-wrapper">
            <p id="group-breadcrumb-link" className="group-details-p">Groups</p>
            <div id="group-details-header">
                <img id="group-details-header-image" src={preview} />
                <div id="group-details-header-wrapper">
                    <div id="group-details-header-info">
                        <h1 id="group-details-h1">{groupState?.name}</h1>
                        <p className="group-details-p">{groupState?.city}, {groupState?.state}</p>
                        <span>
                            <p className="group-details-p">{groupState?.numMembers}, members </p>
                            <p id="centered-dot" className="group-details-p">.</p>
                            <p className="group-details-p">{groupState?.private ? "Private" : "Public"}</p>
                        </span>
                        <p className="group-details-p">Organized by {groupState?.Organizer?.firstName} {groupState?.Organizer?.lastName}</p>
                    </div>
                    <button id="join-group-button">Join this group</button>
                </div>
            </div>
            <div id="group-details-body">
                <h2 className="group-details-h2">Organizer</h2>
                <p className="group-details-p">{groupState?.Organizer?.firstName} {groupState?.Organizer?.lastName}</p>
                <h2 className="group-details-h2">What we&apos;re about</h2>
                <p className="group-details-p">{groupState?.about} Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti in adipisci vel sunt quam quaerat eos enim, incidunt ad molestias. Iusto libero aliquid facilis accusantium sapiente blanditiis architecto consequatur vitae! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex veritatis possimus laudantium quia, quo quos delectus neque iusto magni fugit et quas nisi laboriosam consequatur optio! Fugit quod quas eaque.
                    Voluptate eaque error itaque maiores illum velit quo totam incidunt dolorem, alias excepturi ab! Expedita nihil, exercitationem tenetur sunt at aperiam aut molestias nesciunt corrupti assumenda magni, dolor debitis atque?</p>
                <h2 className="group-details-h2">Upcoming Events</h2>
                <h2 className="group-details-h2">Past Events</h2>
            </div>
        </div >
    )
};

export default GroupDetailsPage;
