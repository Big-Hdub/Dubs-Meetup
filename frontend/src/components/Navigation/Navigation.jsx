import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import ProfileButton from './ProfileButton';
import './Navigation.css'

const Navigation = ({ isLoaded }) => {
    const navigate = useNavigate();
    const user = useSelector(sessionActions.selectSessionUser).user;

    return (
        <nav id="nav-bar">
            <span id="left-nav">
                <p id="home-link" className="nav-bar-links" onClick={() => navigate('/')}>Dubs Family Meetup</p>
            </span>
            <span id="right-nav">
                {isLoaded && user ?
                    <>
                        <OpenModalMenuItem
                            itemText="Start a new group"
                            classname=" nav-bar-links"
                            modalComponent={<LoginFormModal navigate={navigate} />} />
                        <ProfileButton user={user} />
                    </> : <>
                        <OpenModalMenuItem
                            itemText="Log In"
                            classname=" nav-bar-links"
                            modalComponent={<LoginFormModal navigate={navigate} />} />
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            classname=" nav-bar-links"
                            modalComponent={<SignupFormModal navigate={navigate} />} />
                    </>
                }
            </span>
        </nav>
    );
};

export default Navigation;
