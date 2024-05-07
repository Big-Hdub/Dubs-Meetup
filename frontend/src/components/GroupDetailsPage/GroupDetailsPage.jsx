import { useParams } from "react-router-dom";

const GroupDetailsPage = () => {
    const { id } = useParams();

    return (<h2>Group {id} Details Page</h2>)
};

export default GroupDetailsPage;
