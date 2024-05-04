import { useModal } from '../../context/Modal';

function OpenModalMenuItem({
    modalComponent,
    itemText,
    onItemClick,
    onModalClose,
    url,
    classname
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (typeof onItemClick === "function") onItemClick();
    };

    return (
        <p className={'ModalMenuItem' + classname} to={url} onClick={onClick}>{itemText}</p>
    );
}

export default OpenModalMenuItem;
