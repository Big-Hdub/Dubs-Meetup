import { createGroup } from "../../utils/groups";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "./CreateGroup.css"

const CreateGroup = () => {
    document.querySelector('title').innerText = 'Start a New Group';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [location, setLocation] = useState('');
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [type, setType] = useState('');
    const [isPrivate, setIsPrivate] = useState('');
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors({});
        const errors = {}
        if (!location.includes(', ')) errors.location = 'Must be in this format: "City, ST"';
        if (url == '') errors.preview = 'Image required.'
        const locationArray = location.split(', ');
        const groupData = {
            city: locationArray[0],
            state: locationArray[1],
            name,
            about,
            type,
            private: new Boolean(isPrivate)
        }
        const imageObj = {
            url,
            preview: true
        }
        const newGroup = await dispatch(createGroup(groupData, imageObj))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data?.errors) {
                        setErrors({ ...data.errors, ...errors })
                    }
                });
        if (newGroup) {
            navigate(`/groups/${newGroup.id}`)
        }
    }

    return (
        <form id="create-group-form"
            onSubmit={handleSubmit}
        >
            <header className="create-group-sections">
                <p id="create-group-form-top-p">BECOME AN ORGANIZER</p>
                <h1 id="create-group-h1">We&apos;ll walk you through a few steps to build your local community</h1>
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
                <input type="text"
                    name="group-name"
                    className="create-group-inputs"
                    placeholder="What is your group's name?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="errors">{"Needs a group name."}</p>}
            </div>
            <div className="create-group-sections">
                <h2>Describe the purpose of your group.</h2>
                <p>People will see this when we promote your group, but you&apos;ll be able to add to it later, too.</p>
                <ol>
                    <li>1. What&apos;s the purpose of the group?</li>
                    <li>2. Who should join?</li>
                    <li>3. What will you do at your events?</li>
                </ol>
                <textarea name="about"
                    className="create-group-inputs"
                    id="create-group-about"
                    placeholder="Please write at least 50 characters."
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
            </div>
            <button id="create-group-button"
                type="submit"
            >Create group</button>
        </form >
    )
};

export default CreateGroup;
