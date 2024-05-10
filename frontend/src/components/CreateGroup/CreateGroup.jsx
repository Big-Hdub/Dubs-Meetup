import { useDispatch } from "react-redux";
import { useState } from "react";
import "./CreateGroup.css"
import { createGroup } from "../../utils/groups";

const CreateGroup = () => {
    document.querySelector('title').innerText = 'Start a New Group';
    const dispatch = useDispatch();
    const [location, setLocation] = useState('');
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [type, setType] = useState('');
    const [isPrivate, setIsPrivate] = useState('');
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = e => {
        e.preventDefault();
        setErrors({});
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
        return dispatch(createGroup(groupData, imageObj))
            .then()
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data?.errors) setErrors(data.errors)
                });

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
                {errors.city && <p className="errors">{errors.city}</p>}
                {errors.state && <p className="errors">{errors.state} in form of &quot;WA&quot;</p>}
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
                <label>Is this an in-person or online group?</label>
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
                {errors.type && <p className="errors">{errors.type}</p>}
                <label>Is this group private or public?</label>
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
                {errors.private && <p className="errors">{errors.private}</p>}
                <label> Please add an image URL for your group below.</label>
                <input type="text"
                    className="create-group-inputs"
                    placeholder="Image Url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                {errors.preview && <p className="errors">{errors.preview}</p>}
            </div>
            <button id="create-group-button"
                type="submit"
                disabled={
                    name.length < 1
                }
            >Create group</button>
        </form >
    )
};

export default CreateGroup;
