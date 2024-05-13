import { useEffect, useState } from "react";
import * as groupActions from "../../store/groups";
import { useDispatch, useSelector } from "react-redux";
import { loadGroupDetails } from "../../utils/groups";

const EventDetails = ({ id, event: { name, groupId, description, previewImage, startDate, EventImages } }) => {
    const dispatch = useDispatch();
    const [preview, setPreview] = useState('');
    const [date, setDate] = useState({});
    let GroupId;
    if (id === undefined) GroupId = groupId;
    else GroupId = id;
    const group = useSelector(groupActions.selectGroup).entities[GroupId]

    useEffect(() => {
        const loader = async () => {
            await dispatch(loadGroupDetails(groupId))
        };
        loader();
    }, [dispatch, groupId]);

    useEffect(() => {
        if (previewImage)
            previewImage.includes("https://dubs-meetup.onrender.com") ?
                setPreview(previewImage.slice(32)) :
                setPreview(previewImage);
        else if (EventImages?.length) {
            const previewImage = EventImages.find(image => image.preview === true).url;
            previewImage.includes("https://dubs-meetup.onrender.com") ?
                setPreview(previewImage.slice(32)) :
                setPreview(previewImage);
        } else {
            setPreview("/api/images/knights")
        }
    }, [previewImage, EventImages, id])

    useEffect(() => {
        if (startDate) {
            const dateTime = new Date(startDate)?.toLocaleString().split(", ");
            const [month, day, year] = dateTime[0].split("/");
            const [time, amOrPm] = dateTime[1].split(':00 ')
            setDate({ month, day, year, time, amOrPm });
        }
    }, [startDate])

    return (
        <>
            <div className="group-details-event-top">
                <img src={preview} className="group-details-event-img" />
                <div className="group-details-event-header">
                    <span className="group-details-event-span">
                        <p className="group-details-event-date">{date?.year}-{date?.month}-{date?.day}</p>
                        <p className="group-details-event-date centered-dot">.</p>
                        <p className="group-details-event-date">{date?.time} {date?.amOrPm}</p>
                    </span>
                    <h2 className="group-details-event-h2">{name}</h2>
                    <p className="group-details-event-p">{group?.city}, {group?.state}</p>
                </div>
            </div>
            <div className="group-details-event-bottom">
                <p className="group-details-event-p">{description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, perferendis! Nam fugit aliquam voluptatum eius aut nobis laudantium iste. Quam natus accusantium, recusandae deleniti voluptates rem quis assumenda! Voluptatibus, est.
                    Commodi ut suscipit quibusdam laborum laboriosam? Earum quia corporis quisquam, nisi facere nihil molestiae nesciunt mollitia nulla esse velit molestias quam totam iure vitae nostrum, perferendis deleniti, minima reiciendis dolores?
                    Ratione, dolorum maxime iste non eos aspernatur exercitationem temporibus magnam perspiciatis recusandae rerum modi beatae culpa aliquid in perferendis cupiditate architecto nobis consectetur porro, nesciunt cumque quia assumenda tempore. Ducimus.</p>
            </div>
        </>
    )
};

export default EventDetails;
