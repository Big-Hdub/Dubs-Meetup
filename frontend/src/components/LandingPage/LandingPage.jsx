import FeatureElements from "./FeatureElements";
import './Landing.css'

const LandingPage = () => {

    return (
        <div id="landing-main">
            <div id="landing-body">
                <div id="landing-body-left">
                    <h1 id="landing-h1">The Dubs family platform - Where family stays connected</h1>
                    <p className="landing-p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim molestiae autem incidunt quisquam beatae.
                        Quasi, magnam maxime et nulla voluptates, quidem harum neque itaque dolorum in tenetur dicta rem alias?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim molestiae autem incidunt quisquam beatae.
                        Quasi, magnam maxime et nulla voluptates, quidem harum neque itaque dolorum in tenetur dicta rem alias?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim molestiae autem incidunt quisquam beatae.
                        Quasi, magnam maxime et nulla voluptates, quidem harum neque itaque dolorum in tenetur dicta rem alias?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim molestiae autem incidunt quisquam beatae.
                        Quasi, magnam maxime et nulla voluptates, quidem harum neque itaque dolorum in tenetur dicta rem alias?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim molestiae autem incidunt quisquam beatae.
                        Quasi, magnam maxime et nulla voluptates, quidem harum neque itaque dolorum in tenetur dicta rem alias?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim molestiae autem incidunt quisquam beatae.</p>
                </div>
                <div id="landing-body-right">
                    <img id="landing-page-pic" src="/api/images/landing" />
                </div>
            </div>
            <div id="landing-summary">
                <h2 id="landing-h2">How Dubs Family Meetup works</h2>
                <p className="landing-p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima cum alias incidunt natus.</p>
            </div>
            <div id="landing-footer">
                <div id="landing-features">
                    <FeatureElements url="/api/images/group-thumb" linkheader="See all groups" linktext="Lorem ipsum dolor sit amet" />
                    <FeatureElements url="/api/images/knights" linkheader="Find an event" linktext="Lorem ipsum dolor sit amet" />
                    <FeatureElements url="/api/images/cabin" linkheader="Start a new group" linktext="Lorem ipsum dolor sit amet" />
                </div>
                <button id="join-dubs-meetup-button">Join Dubs Meetup</button>
            </div>
        </div>
    );
};

export default LandingPage;
