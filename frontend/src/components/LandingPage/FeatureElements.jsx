import { useNavigate } from "react-router-dom";


const FeatureElements = ({ url, linktext, linkheader, disabled, linkUrl }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!disabled) {
            navigate(linkUrl);
            window.scroll(0, 0);
        }
    };

    return (
        <div className="feature-div">
            <img className="feature-img feature-item" src={url} />
            <h2 className={disabled ? "feature-item disabled" : "feature-item feature-link"} onClick={handleClick}>{linkheader}</h2>
            <p className="feature-item">{linktext}</p>
        </div>
    )
};

export default FeatureElements;
