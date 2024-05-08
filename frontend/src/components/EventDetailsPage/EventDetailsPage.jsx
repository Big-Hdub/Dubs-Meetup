import { useParams } from "react-router-dom";

const EventDetailsPage = () => {
    const { id } = useParams();

    return (<h1>Event {id} Details Page</h1>)
};

export default EventDetailsPage;
