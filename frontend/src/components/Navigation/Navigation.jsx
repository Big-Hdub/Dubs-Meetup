import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import * as sessionActions from "../../store/session";
import './Navigation.css'

const Navigation = ({ isLoaded }) => {
    const session = useSelector(sessionActions.selectSessionUser);

    return (
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            {isLoaded && (
                <li>
                    <ProfileButton user={session.user} />
                </li>
            )}
        </ul>
    );
};

export default Navigation;
