// PageSection/Notice.jsx
import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

const NoticeSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(10, 'Too Short!')
        .required('Required'),
    notices: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().required('Required'),
            date: Yup.string().required('Required'),
            content: Yup.string().required('Required')
        })
    )
});

// Default data structure
const defaultNoticeData = {
    title: 'Notices & Announcements',
    description: 'Important notices and announcements for students and parents.',
    notices: [
        {
            title: 'Holiday Notice',
            date: '2023-10-02',
            content: 'School will remain closed on October 5th for Gandhi Jayanti.'
        }
    ]
};

const Notice = ({ viewMode, setViewMode }) => {
    // Safely get data from localStorage with fallback to default
    const getInitialValues = () => {
        try {
            const storedData = localStorage.getItem('noticeData');
            if (!storedData) return defaultNoticeData;

            const parsedData = JSON.parse(storedData);

            // Ensure all required fields exist with proper fallbacks
            return {
                title: parsedData.title || defaultNoticeData.title,
                description: parsedData.description || defaultNoticeData.description,
                notices: Array.isArray(parsedData.notices)
                    ? parsedData.notices
                    : defaultNoticeData.notices
            };
        } catch (error) {
            console.error('Error parsing notice data:', error);
            return defaultNoticeData;
        }
    };

    const initialValues = getInitialValues();

    const handleSubmit = (values) => {
        localStorage.setItem('noticeData', JSON.stringify(values));
        alert('Notice data saved successfully!');
        setViewMode('table');
    };

    // Table view for displaying content
    if (viewMode === 'table') {
        return (
            <div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Notices & Announcements</h3>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 className="font-medium mb-2">{initialValues.title}</h4>
                        <p className="text-gray-600">{initialValues.description}</p>
                    </div>

                    <h4 className="font-medium mb-3">Current Notices</h4>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notice Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {initialValues.notices && initialValues.notices.map ?
                                    initialValues.notices.map((notice, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {notice.title || `Notice ${index + 1}`}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {notice.date ? new Date(notice.date).toLocaleDateString() : 'Date not set'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {notice.content || 'No content available'}
                                            </td>
                                        </tr>
                                    ))
                                    : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                                                No notices available
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        onClick={() => setViewMode('form')}
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                    >
                        Edit Content
                    </button>
                </div>
            </div>
        );
    }

    // Form view for editing content
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={NoticeSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched }) => (
                <Form className="space-y-6">
                    <div className="border-b pb-4">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Notice Information</h3>

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
                                rows="4"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                            />
                            {errors.description && touched.description && (
                                <div className="text-red-500 text-sm">{errors.description}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Notices List</label>
                            <FieldArray name="notices">
                                {({ push, remove }) => (
                                    <div className="space-y-4 mt-2">
                                        {values.notices && values.notices.map((_, index) => (
                                            <div key={index} className="p-4 border rounded-md bg-gray-50">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="font-medium">Notice {index + 1}</h4>
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
                                                        <label className="block text-sm text-gray-700">Notice Title</label>
                                                        <Field
                                                            name={`notices.${index}.title`}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm text-gray-700">Date</label>
                                                        <Field
                                                            type="date"
                                                            name={`notices.${index}.date`}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm text-gray-700">Notice Content</label>
                                                    <Field
                                                        as="textarea"
                                                        name={`notices.${index}.content`}
                                                        rows="3"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => push({ title: '', date: '', content: '' })}
                                            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                                        >
                                            Add Notice
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('table')}
                            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Notice;