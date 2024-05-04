import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { ImUserTie } from "react-icons/im";
import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const divRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!divRef.current.contains(e.target)) setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
    };

    const divClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button id="profile-button" onClick={toggleMenu}>
                <ImUserTie />
            </button>
            <div className={divClassName} ref={divRef}>
                <p className="profile-menu-items">Hello, {user?.username}</p>
                <p className="profile-menu-items">{user?.email}</p>
                <p id="profile-menu-logout" className="profile-menu-items" onClick={logout}>Log Out</p>
            </div>
        </>
    )
};

export default ProfileButton;
