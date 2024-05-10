import "./CreateGroup.css"

const CreateGroup = () => {
    document.querySelector('title').innerText = 'Start a New Group';

    return (
        <form id="create-group-form">
            <header className="create-group-sections">
                <p id="create-group-form-top-p">BECOME AN ORGANIZER</p>
                <h1 id="create-group-h1">We&apos;ll walk you through a few steps to build your local community</h1>
            </header>
            <div className="create-group-sections">
                <h2>Set your group&apos;s location.</h2>
                <p>Meetup groups meet locally, in person, and online. We&apos;ll connect you with people in your area.</p>
                <input type="text" name="location" className="create-group-inputs" placeholder="City, STATE" />
            </div>
            <div className="create-group-sections">
                <h2>What will your group&apos;s name be?</h2>
                <p>Choose a name that will give people a clear idea of what the group is about.  Feel free to get creative!  You can edit this later if you change your mind.</p>
                <input type="text" name="group-name" className="create-group-inputs" placeholder="What is your groups name?" />
            </div>
            <div className="create-group-sections">
                <h2>Describe the purpose of your group.</h2>
                <p>People will see this when we promote your group, but you&apos;ll be able to add to it later, too.</p>
                <ol>
                    <li>What&apos;s the purpose of the group?</li>
                    <li>Who should join?</li>
                    <li>What will you do at your events?</li>
                </ol>
                <textarea className="create-group-inputs" name="description" id="create-group-description" placeholder="Please write at least 30 characters."></textarea>
            </div>
            <div className="create-group-sections">
                <label>Is this an in-person or online group?</label>
                <select className="create-group-selects" name="type" id="create-group-type">
                    <option value="">(select one)</option>
                    <option value="In-person">In Person</option>
                    <option value="Online">Online</option>
                </select>
                <label>Is this group private or public?</label>
                <select className="create-group-selects" name="private?" id="create-group-private">
                    <option value="">(select one)</option>
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                </select>
                <label> Please add an image URL for your group below.</label>
                <input className="create-group-inputs" type="url" placeholder="Image Url" />
            </div>
            <button id="create-group-button" type="submit">Create group</button>
        </form>
    )
};

export default CreateGroup;
