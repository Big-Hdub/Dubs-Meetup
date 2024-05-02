import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import './Navigation.css'

const Navigation = ({ isLoaded }) => {
    const session = useSelector(sessionActions.selectSessionUser);
    const dispatch = useDispatch();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
    }

    const sessionLinks = session.user ? (
        <>
            <li>
                <ProfileButton user={session.user} />
            </li>
            <li>
                <button onClick={logout}>Log Out</button>
            </li>
        </>
    ) : (
        <>
            <li>
                <NavLink to="/login">Log In</NavLink>
            </li>
            <li>
                <NavLink to="/signup">Sign Up</NavLink>
            </li>
        </>
    );

    return (
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );
};

export default Navigation;
