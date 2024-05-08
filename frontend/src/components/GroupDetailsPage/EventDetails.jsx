import * as groupActions from "../../store/groups";
import { useSelector } from "react-redux";

const EventDetails = ({ id, event: { name, previewImage, startDate } }) => {
    const group = useSelector(groupActions.selectGroup).entities[Number(id)];
    const date = new Date(startDate);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    let time = date.toLocaleTimeString();
    const amOrPm = time.slice(time.indexOf('M') - 1);
    time = time.split(':').splice(0, 2).join(':');

    return (
        <>
            <div className="group-details-event-top">
                <img src={previewImage} className="group-details-event-img" />
                <div className="group-details-event-header">
                    <span className="group-details-event-span">
                        <p className="group-details-event-date">{year}-{month}-{day}</p>
                        <p className="group-details-event-date centered-dot">.</p>
                        <p className="group-details-event-date">{time} {amOrPm}</p>
                    </span>
                    <h2 className="group-details-event-h2">{name}</h2>
                    <p className="group-details-event-p">{group?.city}, {group?.state}</p>
                </div>
            </div>
            <div className="group-details-event-bottom">
                <p className="group-details-event-p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, perferendis! Nam fugit aliquam voluptatum eius aut nobis laudantium iste. Quam natus accusantium, recusandae deleniti voluptates rem quis assumenda! Voluptatibus, est.
                    Commodi ut suscipit quibusdam laborum laboriosam? Earum quia corporis quisquam, nisi facere nihil molestiae nesciunt mollitia nulla esse velit molestias quam totam iure vitae nostrum, perferendis deleniti, minima reiciendis dolores?
                    Ratione, dolorum maxime iste non eos aspernatur exercitationem temporibus magnam perspiciatis recusandae rerum modi beatae culpa aliquid in perferendis cupiditate architecto nobis consectetur porro, nesciunt cumque quia assumenda tempore. Ducimus.</p>
            </div>
        </>
    )
};

export default EventDetails;
