import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { ImUserTie } from "react-icons/im";
import * as sessionActions from '../../store/session';
import { useNavigate } from "react-router-dom";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        navigate('/');
        closeMenu();
    };

    const divClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <span>
                <button id="profile-button" onClick={toggleMenu}>
                    <ImUserTie />
                </button>
                {showMenu ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleUp} />}
            </span>
            <div className={divClassName} ref={divRef}>
                <p className="profile-menu-items">Hello, {user?.username}</p>
                <p className="profile-menu-items">{user?.email}</p>
                <p id="profile-menu-groups" className="profile-menu-items" onClick={() => { navigate("/groups/current"); closeMenu() }}>Your groups</p>
                <p id="profile-menu-events" className="profile-menu-items" onClick={() => { navigate("/events"); closeMenu() }}>View events</p>
                <p id="profile-menu-logout" className="profile-menu-items" onClick={logout}>Log Out</p>
            </div>
        </>
    )
};

export default ProfileButton;
