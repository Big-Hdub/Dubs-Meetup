import { useModal } from "../../context/Modal";

const OpenModalButton = ({ classname, modalComponent, buttonText, onButtonClick, onModalClose }) => {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (typeof onButtonClick === "function") onButtonClick();
    };

    return <button className={classname} onClick={onClick}>{buttonText}</button>;
};

export default OpenModalButton;
