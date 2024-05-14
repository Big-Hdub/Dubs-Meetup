import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteEvent } from "../../utils/events";
import './DeleteEvent.css'


const DeleteEventModal = ({ event, navigate }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        const data = await dispatch(deleteEvent(event.id));
        if (data.message === "Successfully deleted") {
            closeModal();
            navigate(`/groups/${event.groupId}`, { state: { deleted: true } });
        }
    }

    return (
        <div id="confirm-delete-event-container">
            <h1 id="delete-event-h1">Confirm Delete</h1>
            <p id="delete-event-p">Are you sure you want to remove this event?</p>
            <button id="delete-event-yes" onClick={handleDelete}>Yes (Delete Event)</button>
            <button id="delete-event-no" onClick={closeModal}>No (Keep Event)</button>
        </div>
    )
};

export default DeleteEventModal;
