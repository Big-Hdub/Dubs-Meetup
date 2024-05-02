import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal"
import * as sessionActions from "../../store/session";
import './Navigation.css'

const Navigation = ({ isLoaded }) => {
    const session = useSelector(sessionActions.selectSessionUser);

    const sessionLinks = session.user ? (
        <li>
            <ProfileButton user={session.user} />
        </li>
    ) : (
        <>
            <li>
                <OpenModalButton
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />} />
            </li>
            <li>
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                />
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
