
const GroupDetails = ({ group, group: { name, about, city, state, numMembers, previewImage } }) => {
    let url;
    if (previewImage) previewImage.includes("https://dubs-meetup.onrender.com") ? url = previewImage.slice(32) : url = previewImage;
    else url = "/api/images/group-thumb"

    return (
        <>
            <img className="group-details-image" src={url} alt="/api/images/group-thumb" />
            <div className="details-wrapper">
                <h4 className="group-details-h4">{name}</h4>
                <h5 className="group-details-h5">{city}, {state}</h5>
                <h6 className="group-details-h6">{about}</h6>
                <span className="group-details-span">
                    <p className="group-details-p">{numMembers} members</p>
                    <p className="group-details-p centered-dot">.</p>
                    <p className="group-details-p">{group.private ? "private" : "public"}</p>
                </span>
            </div>
        </>
    )
};

export default GroupDetails;
