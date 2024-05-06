
const GroupDetails = ({ group }) => {


    return (
        <>
            <img className="group-details-image" src={"/api/images/group-thumb"} alt="/api/images/group-thumb" />
            <div className="details-wrapper">
                <h4 className="group-details-h4">{group.name}</h4>
                <h5 className="group-details-h5">Location</h5>
                <h6 className="group-details-h6">About</h6>
                <span className="group-details-span">
                    <p className="group-details-p">## events</p>
                    <p className="group-details-p">Public</p>
                </span>
            </div>
        </>
    )
};

export default GroupDetails;
