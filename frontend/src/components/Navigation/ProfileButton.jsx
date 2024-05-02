import { useState, useEffect, useRef } from "react";
import { ImUserTie } from "react-icons/im";
// import { useDispatch } from "react-redux";
// import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {
    // const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button id="profile-button" onClick={toggleMenu}>
                <ImUserTie />
            </button>
            <ul className={ulClassName}>
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
            </ul>
        </>
    )
};

export default ProfileButton;
