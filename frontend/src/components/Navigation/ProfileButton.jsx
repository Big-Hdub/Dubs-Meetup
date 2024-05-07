import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { ImUserTie } from "react-icons/im";
import * as sessionActions from '../../store/session';
import { useNavigate } from "react-router-dom";

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const logout = () => {
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
                <p id="profile-menu-groups" className="profile-menu-items" onClick={() => { navigate("/groups"); closeMenu() }}>View groups</p>
                <p id="profile-menu-logout" className="profile-menu-items" onClick={logout}>Log Out</p>
            </div>
        </>
    )
};

export default ProfileButton;
