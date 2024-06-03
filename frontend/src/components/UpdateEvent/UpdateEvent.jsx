import { useLocation, useNavigate } from 'react-router-dom';
import '../CreateEvent/CreateEvent.css'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateEvent } from '../../utils/events';

const UpdateEvent = () => {
    const group = useLocation().state.group;
    const event = useLocation().state.event;
    document.querySelector('title').innerText = `Create a new event for ${group.name}`;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [eventName, setEventName] = useState(event.name);
    const [type, setType] = useState(event.type);
    const [price, setPrice] = useState(+event.price);
    const [capacity, setCapacity] = useState(+event.capacity);
    const [startDate, setStartDate] = useState((new Date(event.startDate)).toISOString().slice(0, 16));
    const [endDate, setEndDate] = useState((new Date(event.endDate)).toISOString().slice(0, 16));
    const [url, setUrl] = useState(event.preview);
    const [description, setDescription] = useState(event.description);
    const [errors, setErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors({});
        console.log(startDate)
        const eventData = {
            id: event.id,
            name: eventName,
            type,
            price: price === 0 ? price.toFixed(2) : price,
            startDate,
            endDate,
            description,
            groupId: group.id,
            venueId: 1,
            capacity
        };
        const imageData = {
            url,
            preview: true
        };
        const newEvent = await dispatch(updateEvent(eventData, imageData))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data?.errors) {
                        setErrors(data.errors)
                    }
                    console.log(errors)
                });
        navigate(`/events/${event.id}`, { state: { event: newEvent } });
    }

    return (
        <form id='create-event-form'
            onSubmit={handleSubmit}>
            <section id='header'
            >
                <h1>Update event for {group.name}</h1>
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
                            value={price}
                            onChange={(e) => e.target.value > -1 ? setPrice(e.target.value) : setPrice(0)}
                        />
                    </span>
                    {errors.price && <p className="errors">{errors.price}</p>}
                </label>
                <label className='create-event-label'>How many people can attend your event?
                    <span>
                        <input type='number'
                            name="capacity"
                            id="create-event-capacity"
                            value={capacity}
                            onChange={(e) => e.target.value > 0 ? setCapacity(e.target.value) : setCapacity(1)}
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
                        placeholder='Please include at least 30 characters'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <p className="errors">{errors.description}</p>}
                </label>
            </section>
            <button type='submit'>Update Event</button>
        </form>
    )
};

export default UpdateEvent;
