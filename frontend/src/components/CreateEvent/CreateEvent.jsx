import { useLocation } from 'react-router-dom';
import './CreateEvent.css'

const CreateEvent = () => {
    const name = useLocation().state.group.name;
    return (
        <form id='create-event-form'>
            <section id='header'>
                <h1>Create a new event for {name}</h1>
                <label className='create-event-label'>What is the name of your event?
                    <input id='create-event-name' type="text" placeholder='Event Name' />
                </label>
            </section>
            <section id='section-one' className='create-event-sections'>
                <label className='create-event-label'>Is this an in-person or online group?
                    <select id='create-event-format'>
                        <option value="" disabled>(select one)</option>
                        <option value="In person">In person</option>
                        <option value="Online">Online</option>
                    </select>
                </label>
                <label className='create-event-label'>What is the price for your event?
                    <span>
                        <p>
                            $
                        </p>
                        <input type='number' name="price" id="create-event-price" placeholder="0" />
                    </span>
                </label>
            </section>
            <section id='section-two' className='create-event-sections'>
                <label className='create-event-label'>When does your event start?
                    <input type="datetime-local" name="startDate" id="create-event-start" />
                </label>
                <label className='create-event-label'>When does your event end?
                    <input type="datetime-local" name="endDate" id="create-event-end" />
                </label>
            </section>
            <section id='section-three' className='create-event-sections'>
                <label className='create-event-label'>Please add an image url for your event below.
                    <input type="text" name="eventImage" id="create-event-image-url" placeholder='Image URL' />
                </label>
            </section>
            <section id='section-four' className='create-event-sections'>
                <label className='create-event-label'>Please describe your event
                    <textarea id='create-event-description' placeholder='Please inclue at least 30 characters' />
                </label>
            </section>
            <button type='submin'>Create Event</button>
        </form>
    )
};

export default CreateEvent;
