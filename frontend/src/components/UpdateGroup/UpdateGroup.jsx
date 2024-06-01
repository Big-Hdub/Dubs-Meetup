import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as groupActions from "../../store/groups";
import { updateGroup } from "../../utils/groups";
import { useEffect, useState } from "react";

const UpdateGroup = () => {
    document.querySelector('title').innerText = 'Update your group';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const session = useSelector(sessionActions.selectSessionUser).user;
    const group = useSelector(groupActions.selectGroup).entities[+id];
    const [location, setLocation] = useState(`${group?.city}, ${group?.state}`);
    const [name, setName] = useState(group?.name);
    const [about, setAbout] = useState(group?.about);
    const [type, setType] = useState(group?.type);
    const [isPrivate, setIsPrivate] = useState(group?.private);
    const [url, setUrl] = useState(group?.preview ? group.preview : group?.GroupImages.find(image => image.preview === true).url);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (session === null || session.id !== group?.organizerId) navigate('/');
    }, [navigate, session, group])

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors({});
        const errors = {}
        if (!location.includes(', ')) errors.location = 'Must be in this format: "City, ST"';
        const locationArray = location.split(', ');
        const groupData = {
            city: locationArray[0],
            state: locationArray[1],
            name,
            about,
            type,
            private: isPrivate
        };
        const imageObj = {
            url,
            preview: true
        }
        const updatedGroup = await dispatch(updateGroup(groupData, imageObj, +id))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data?.errors) {
                        setErrors({ ...data.errors, ...errors })
                    }
                });
        navigate(`/groups/${updatedGroup.id}`)
    }

    return (
        <form id="create-group-form"
            onSubmit={handleSubmit}
        >
            <header className="create-group-sections">
                <h1 id="create-group-h1">Update your Group</h1>
            </header>
            <div className="create-group-sections">
                <h2>Set your group&apos;s location.</h2>
                <p>Meetup groups meet locally, in person, and online. We&apos;ll connect you with people in your area.</p>
                <input type="text" name="location"
                    className="create-group-inputs"
                    placeholder="City, STATE"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                {errors.location ?
                    <>
                        {errors.location && <p className="errors">{errors.location}</p>}
                    </> : <>
                        {errors.city && <p className="errors">{errors.city}</p>}
                        {errors.state && <p className="errors">{errors.state} in form of &quot;WA&quot;</p>}
                    </>
                }
            </div>
            <div className="create-group-sections">
                <h2>What will your group&apos;s name be?</h2>
                <p>Choose a name that will give people a clear idea of what the group is about.  Feel free to get creative!  You can edit this later if you change your mind.</p>
                <input type="text" name="group-name"
                    className="create-group-inputs"
                    placeholder="What is your groups name?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="errors">{errors.name}</p>}
            </div>
            <div className="create-group-sections">
                <h2>Describe the purpose of your group.</h2>
                <p>People will see this when we promote your group, but you&apos;ll be able to add to it later, too.</p>
                <ol>
                    <li>What&apos;s the purpose of the group?</li>
                    <li>Who should join?</li>
                    <li>What will you do at your events?</li>
                </ol>
                <textarea name="about"
                    className="create-group-inputs"
                    id="create-group-about"
                    placeholder="Please write at least 30 characters."
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                ></textarea>
                {errors.about && <p className="errors">{errors.about}</p>}
            </div>
            <div className="create-group-sections">
                <label className="create-group-labels" name="type">
                    <p>
                        Is this an in-person or online group?
                    </p>
                    <select name="type"
                        className="create-group-selects"
                        id="create-group-type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="" disabled>(select one)</option>
                        <option value="In person">In Person</option>
                        <option value="Online">Online</option>
                    </select>
                </label>
                {errors.type && <p className="errors">{errors.type}</p>}
                <label className="create-group-labels" name="private">
                    <p>
                        Is this group private or public?
                    </p>
                    <select name="private"
                        className="create-group-selects"
                        id="create-group-private"
                        value={isPrivate}
                        onChange={(e) => setIsPrivate(e.target.value)}
                    >
                        <option value="" disabled>(select one)</option>
                        <option value="true">Private</option>
                        <option value="false">Public</option>
                    </select>
                </label>
                {errors.private && <p className="errors">{errors.private}</p>}
                <label className="create-group-labels" name="imageUrl">
                    <p>
                        Please add an image URL for your group below.
                    </p>
                    <input type="text"
                        name="imageUrl"
                        className="create-group-inputs"
                        placeholder="Image Url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </label>
                {errors.preview && <p className="errors">{errors.preview}</p>}
                {errors.url && <p className="errors">{errors.url}</p>}
            </div>
            <button id="create-group-button"
                type="submit"
                disabled={
                    name?.length < 1
                }
            >Update group</button>
        </form >
    )
};

export default UpdateGroup;
