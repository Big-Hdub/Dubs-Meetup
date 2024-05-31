
const GroupDetails = ({ group, group: { name, about, city, state, numMembers, previewImage, preview } }) => {
    let url;
    if (previewImage) url = previewImage;
    else if (preview) url = preview;
    else url = "/api/images/loading";

    return (
        <>
            <img className="group-details-image" src={url} alt={previewImage} />
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
