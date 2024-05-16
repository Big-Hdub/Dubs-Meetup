// import { redirect } from "react-router-dom"
import { deleteGroup } from '../../utils/groups';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import './DeleteGroup.css'

const DeleteGroupModal = ({ group, navigate }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        const data = await dispatch(deleteGroup(group.id))
        if (data.message === "Successfully deleted") {
            closeModal();
            navigate('/groups');
        }
    }

    return (
        <div id="confirm-delete-container">
            <h1 id="delete-group-h1">Confirm Delete</h1>
            <p id="delete-group-p">Are you sure you want to remove this group?</p>
            <button id="delete-group-yes" onClick={handleDelete}>Yes (Delete Group)</button>
            <button id="delete-group-no" onClick={closeModal}>No (Keep Group)</button>
        </div>
    )
};

export default DeleteGroupModal;
