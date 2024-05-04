const FeatureElements = ({ url, linktext, linkheader }) => {

    return (
        <div className="feature-div">
            <img className="feature-img feature-item" src={url} />
            <h2 className="feature-item">{linkheader}</h2>
            <p className="feature-item">{linktext}</p>
        </div>
    )
};

export default FeatureElements;
