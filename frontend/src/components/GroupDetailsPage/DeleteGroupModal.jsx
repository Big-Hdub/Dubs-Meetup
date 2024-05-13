import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteGroup.css'
import { deleteGroup } from '../../utils/groups';

const DeleteGroupModal = ({ group, navigate }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteGroup(group.id))
        closeModal();
        navigate('/groups');
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
