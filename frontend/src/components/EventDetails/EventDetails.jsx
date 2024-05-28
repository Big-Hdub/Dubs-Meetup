import * as eventActions from "../../store/events";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EventDetails = ({ eventId }) => {
    const [date, setDate] = useState({});
    const event = useSelector(eventActions.selectEvents).entities[eventId];

    useEffect(() => {
        if (event?.startDate) {
            const dateTime = new Date(event?.startDate)?.toLocaleString().split(", ");
            let [month, day, year] = dateTime[0].split("/");
            if (month.length == 1) month = "0" + month
            if (day.length == 1) day = "0" + day
            const [time, amOrPm] = dateTime[1].split(':00 ')
            setDate({ month, day, year, time, amOrPm });
        }
    }, [event])

    return (
        <>
            <div className="group-details-event-top">
                <img src={event?.previewImage ?
                    event.previewImage.includes("https://dubs-meetup.onrender.com") ?
                        event.previewImage.slice(32) :
                        event.previewImage : "/api/images/knights"

                } className="group-details-event-img" />
                <div className="group-details-event-header">
                    <span className="group-details-event-span">
                        <p className="group-details-event-date">{date?.year}-{date?.month}-{date?.day}</p>
                        <p className="group-details-event-date centered-dot">.</p>
                        <p className="group-details-event-date">{date?.time} {date?.amOrPm}</p>
                    </span>
                    <h2 className="group-details-event-h2">{event?.name}</h2>
                    <p className="group-details-event-p">{event?.Venue?.city}, {event?.Venue?.state}</p>
                </div>
            </div>
            <div className="group-details-event-bottom">
                <p className="group-details-event-p">{event?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, perferendis! Nam fugit aliquam voluptatum eius aut nobis laudantium iste. Quam natus accusantium, recusandae deleniti voluptates rem quis assumenda! Voluptatibus, est.
                    Commodi ut suscipit quibusdam laborum laboriosam? Earum quia corporis quisquam, nisi facere nihil molestiae nesciunt mollitia nulla esse velit molestias quam totam iure vitae nostrum, perferendis deleniti, minima reiciendis dolores?
                    Ratione, dolorum maxime iste non eos aspernatur exercitationem temporibus magnam perspiciatis recusandae rerum modi beatae culpa aliquid in perferendis cupiditate architecto nobis consectetur porro, nesciunt cumque quia assumenda tempore. Ducimus.</p>
            </div>
        </>
    )
};

export default EventDetails;
