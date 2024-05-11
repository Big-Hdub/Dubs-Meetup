import { useLocation, useNavigate } from 'react-router-dom';
import './CreateEvent.css'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createEvent } from '../../utils/events';

const CreateEvent = () => {
    const group = useLocation().state.group;
    document.querySelector('title').innerText = `Create a new event for ${group.name}`;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [eventName, setEventName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors({});
        const eventData = {
            name: eventName,
            type,
            price,
            startDate,
            endDate,
            description,
            groupId: group.id,
            venueId: 1,
            capacity
        }
        const imageData = {
            url,
            preview: true
        }
        const newEvent = await dispatch(createEvent(eventData, imageData))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data?.errors) {
                        setErrors(data.errors)
                    }
                });
        if (newEvent?.id) navigate(`/events/${newEvent.id}`)
    }

    return (
        <form id='create-event-form'
            onSubmit={handleSubmit}>
            <section id='header'
            >
                <h1>Create a new event for {group.name}</h1>
                <label className='create-event-label'>What is the name of your event?
                    <input type="text"
                        id='create-event-name'
                        placeholder='Event Name'
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                    {errors.name && <p className="errors">{errors.name}</p>}
                </label>
            </section>
            <section id='section-one'
                className='create-event-sections'>
                <label className='create-event-label'>Is this an in-person or online group?
                    <select id='create-event-type'
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="" disabled>(select one)</option>
                        <option value="In person">In person</option>
                        <option value="Online">Online</option>
                    </select>
                    {errors.type && <p className="errors">{errors.type}</p>}
                </label>
                <label className='create-event-label'>What is the price for your event?
                    <span>
                        <p>
                            $
                        </p>
                        <input type='number'
                            name="price"
                            id="create-event-price"
                            placeholder={0}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </span>
                    {errors.price && <p className="errors">{errors.price}</p>}
                </label>
                <label className='create-event-label'>How many people can attend your event?
                    <span>
                        <input type='number'
                            name="capacity"
                            id="create-event-capacity"
                            placeholder="0"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        />
                    </span>
                    {errors.capacity && <p className="errors">{errors.capacity}</p>}
                </label>
            </section>
            <section id='section-two' className='create-event-sections'>
                <label className='create-event-label'>When does your event start?
                    <input type="datetime-local"
                        name="startDate"
                        id="create-event-start"
                        value={startDate}
                        required
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    {errors.startDate && <p className="errors">{errors.startDate}</p>}
                </label>
                <label className='create-event-label'>When does your event end?
                    <input type="datetime-local"
                        name="endDate"
                        id="create-event-end"
                        value={endDate}
                        required
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    {errors.endDate && <p className="errors">{errors.endDate}</p>}
                </label>
            </section>
            <section id='section-three' className='create-event-sections'>
                <label className='create-event-label'>Please add an image url for your event below.
                    <input type="text"
                        name="eventImage"
                        id="create-event-image-url"
                        placeholder='Image URL'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    {errors.url && <p className="errors">{errors.url}</p>}
                </label>
            </section>
            <section id='section-four' className='create-event-sections'>
                <label className='create-event-label'>Please describe your event
                    <textarea id='create-event-description'
                        placeholder='Please inclue at least 30 characters'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <p className="errors">{errors.description}</p>}
                </label>
            </section>
            <button type='submit'>Create Event</button>
        </form>
    )
};

export default CreateEvent;
