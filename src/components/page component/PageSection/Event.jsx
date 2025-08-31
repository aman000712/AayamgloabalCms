// PageSection/Event.jsx
import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

const EventSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(10, 'Too Short!')
        .required('Required'),
    events: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Required'),
            date: Yup.string().required('Required'),
            time: Yup.string().required('Required'),
            location: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            readMoreLink: Yup.string().url('Must be a valid URL').nullable()
        })
    )
});

// Default data structure matching the image content
const defaultEventData = {
    title: 'MELT EVENTS AND UPDATES',
    description: 'Stay updated with our upcoming events and activities.',
    events: [
        {
            name: 'Hotel Visit For DBM',
            date: '2025-04-15',
            time: '9',
            location: 'Shirtshoven',
            description: 'A year that we celebrated, separate program, delivers from Avane Global School will visit their Palace to Stockholm. This will offer a unique opportunity to explore and shape the past few years. Down this time\'s holiday is beautiful, stunning, sunflower, and vibrant outdoor experience. Students will gain valuable insights into hospitality management and ...',
            readMoreLink: '#'
        },
        {
            name: 'Hotel Visit For Hotel Management',
            date: '2025-06-05',
            time: '10',
            location: 'Pulcher',
            description: 'As part of their product training, Hotel Management delivers from Avane Global School will visit a prestigious Suite Park in Halbera. This will offer families empower to highlight hospitality operations, including plant office management, guest services, and local and beverage operations. Students will gain valuable insights into the home hotel behavior and ...',
            readMoreLink: '#'
        }
    ]
};

const Event = ({ viewMode, setViewMode }) => {
    // Safely get data from localStorage with fallback to default
    const getInitialValues = () => {
        try {
            const storedData = localStorage.getItem('eventData');
            if (!storedData) return defaultEventData;

            const parsedData = JSON.parse(storedData);

            // Ensure all required fields exist with proper fallbacks
            return {
                title: parsedData.title || defaultEventData.title,
                description: parsedData.description || defaultEventData.description,
                events: Array.isArray(parsedData.events)
                    ? parsedData.events.map(event => ({
                        name: event.name || '',
                        date: event.date || '',
                        time: event.time || '',
                        location: event.location || '',
                        description: event.description || '',
                        readMoreLink: event.readMoreLink || ''
                    }))
                    : defaultEventData.events
            };
        } catch (error) {
            console.error('Error parsing event data:', error);
            return defaultEventData;
        }
    };

    const initialValues = getInitialValues();

    const handleSubmit = (values) => {
        localStorage.setItem('eventData', JSON.stringify(values));
        alert('Event data saved successfully!');
        setViewMode('table');
    };

    // Format date to match the image format: "YYYY MMM DD"
    const formatDate = (dateString) => {
        if (!dateString) return 'Date not set';

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid date';

        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate().toString().padStart(2, '0');

        return `${year} ${month} ${day}`;
    };

    // Table view for displaying content (matching the image design)
    if (viewMode === 'table') {
        return (
            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">EVENTS AND UPDATES</h1>

                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-md text-gray-500">Home / Events</h3>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search events..."
                                className="px-4 py-2 border rounded-md text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {initialValues.events && initialValues.events.length > 0 ?
                        initialValues.events.map((event, index) => (
                            <div key={index} className="border-b pb-8">
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <span className="font-medium">
                                        {formatDate(event.date)} | {event.time} | {event.location}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-4">{event.name}</h3>

                                <p className="text-gray-700 mb-4">
                                    {event.description}
                                </p>

                                <a
                                    href={event.readMoreLink || '#'}
                                    className="text-red-600 font-medium hover:underline"
                                >
                                    Read More
                                </a>
                            </div>
                        ))
                        : (
                            <div className="text-center py-8 text-gray-500">
                                No events scheduled
                            </div>
                        )
                    }
                </div>

                <div className="mt-8">
                    <button
                        onClick={() => setViewMode('form')}
                        className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition"
                    >
                        Edit Content
                    </button>
                </div>
            </div>
        );
    }


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={EventSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched }) => (
                <Form className="space-y-6 p-6">
                    <div className="border-b pb-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Event Information</h3>

                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <Field
                                name="title"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                            />
                            {errors.title && touched.title && (
                                <div className="text-red-500 text-sm">{errors.title}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <Field
                                as="textarea"
                                name="description"
                                rows="3"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                            />
                            {errors.description && touched.description && (
                                <div className="text-red-500 text-sm">{errors.description}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Events List</label>
                            <FieldArray name="events">
                                {({ push, remove }) => (
                                    <div className="space-y-4 mt-2">
                                        {values.events && values.events.map((_, index) => (
                                            <div key={index} className="p-4 border rounded-md bg-gray-50">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="font-medium">Event {index + 1}</h4>
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="text-red-500 text-sm hover:text-red-700"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-sm text-gray-700">Event Name</label>
                                                        <Field
                                                            name={`events.${index}.name`}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm text-gray-700">Location</label>
                                                        <Field
                                                            name={`events.${index}.location`}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-sm text-gray-700">Date</label>
                                                        <Field
                                                            type="date"
                                                            name={`events.${index}.date`}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm text-gray-700">Time</label>
                                                        <Field
                                                            name={`events.${index}.time`}
                                                            placeholder="e.g., 9"
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm text-gray-700">Read More Link (URL)</label>
                                                        <Field
                                                            name={`events.${index}.readMoreLink`}
                                                            placeholder="https://..."
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm text-gray-700">Description</label>
                                                    <Field
                                                        as="textarea"
                                                        name={`events.${index}.description`}
                                                        rows="4"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={() => push({
                                                name: '',
                                                date: '',
                                                time: '',
                                                location: '',
                                                description: '',
                                                readMoreLink: ''
                                            })}
                                            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                                        >
                                            Add Event
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('table')}
                            className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Event;