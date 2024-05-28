import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FeatureElements from "./FeatureElements";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from '../../store/session';
import { useModal } from "../../context/Modal";
import './Landing.css'

const LandingPage = () => {
    document.querySelector('title').innerText = 'Dubs Family Meetup';
    const user = useSelector(sessionActions.selectSessionUser).user;
    const navigate = useNavigate();
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        setOnModalClose(() => navigate('/'));
        setModalContent(<SignupFormModal />);
    };

    return (
        <div id="landing-main">
            <div id="landing-body">
                <div id="landing-body-left">
                    <h1 id="landing-h1">The Dubs family platform</h1>
                    <p className="landing-p" id="landing-about">Welcome to your ultimate platform for organizing family
                        events and staying connected with loved ones. Designed for families, our user-friendly website
                        helps you create and manage groups by location or family ties, simplifying event planning.
                        Create events, send invitations, and track RSVPs effortlessly in one place. Connect with
                        immediate family, extended relatives, or family friends through our customizable groups.
                        Share photos, post updates, and stay in touch in a secure, private environment. Our intuitive
                        design ensures easy navigation for all ages. Access FamilyGather from any device with our
                        mobile-friendly site. Enjoy customizable privacy settings to keep your family&apos;s information
                        safe. Join FamilyGather today to make every family occasion a celebration to remember.</p>
                </div>
                <div id="landing-body-right">
                    <img id="landing-page-pic" src="/api/images/landing" />
                </div>
            </div>
            <div id="landing-summary">
                <h2 id="landing-h2">Features at a Glance</h2>
                <ol id="landing-ol">
                    <li className="landing-li">Event Creation & Management: Plan, invite, and track RSVPs effortlessly.</li>
                    <li className="landing-li">Group Creation & Joining: Connect with family based on location and ties.</li>
                    <li className="landing-li">Social Networking: Share updates, photos, and stay in touch.</li>
                    <li className="landing-li">Privacy Controls: Keep your familys information secure.</li>
                    <li className="landing-li">User-Friendly Design: Easy to use for all ages.</li>
                    <li className="landing-li">Mobile Accessibility: Connect from any device, anywhere.</li>
                </ol>
            </div>
            <div id="landing-footer">
                <div id="landing-features">
                    <FeatureElements url="/api/images/group-thumb" linkUrl="/groups" linkheader="See all groups" linktext="List of all groups based on family ties or location." disabled={false} />
                    <FeatureElements url="/api/images/knights" linkUrl="/events" linkheader="Find an event" linktext="List of all events planned or past of groups." disabled={false} />
                    <FeatureElements url="/api/images/cabin" linkUrl="/groups/create" linkheader="Start a new group" linktext="Start a new family group by family tie or location." disabled={!user} />
                </div>
                {!user ? <button id="join-dubs-meetup-button" onClick={() => onClick()}>Join Dubs Meetup</button> : <></>}
            </div>
        </div>
    );
};

export default LandingPage;
