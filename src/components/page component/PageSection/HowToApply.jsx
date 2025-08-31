// PageSection/HowToApply.jsx
import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

const HowToApplySchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(10, 'Too Short!')
        .required('Required'),
    steps: Yup.array().of(
        Yup.object().shape({
            step: Yup.string().required('Required'),
            description: Yup.string().required('Required')
        })
    ),
    contactInfo: Yup.string()
        .min(10, 'Too Short!')
        .required('Required')
});

// Default data structure
const defaultHowToApplyData = {
    title: 'How to Apply',
    description: 'Follow these simple steps to apply for admission to our school.',
    steps: [
        {
            step: 'Download the application form',
            description: 'Download the application form from our website'
        },
        {
            step: 'Fill out the form',
            description: 'Fill out the form completely with accurate information'
        }
    ],
    contactInfo: 'For any queries related to admissions, contact us at admissions@aayamglobal.com or call +1234567890'
};

const HowToApply = ({ viewMode, setViewMode }) => {
    // Safely get data from localStorage with fallback to default
    const getInitialValues = () => {
        try {
            const storedData = localStorage.getItem('howToApplyData');
            if (!storedData) return defaultHowToApplyData;

            const parsedData = JSON.parse(storedData);

            // Ensure all required fields exist with proper fallbacks
            return {
                title: parsedData.title || defaultHowToApplyData.title,
                description: parsedData.description || defaultHowToApplyData.description,
                steps: Array.isArray(parsedData.steps)
                    ? parsedData.steps
                    : defaultHowToApplyData.steps,
                contactInfo: parsedData.contactInfo || defaultHowToApplyData.contactInfo
            };
        } catch (error) {
            console.error('Error parsing How to Apply data:', error);
            return defaultHowToApplyData;
        }
    };

    const initialValues = getInitialValues();

    const handleSubmit = (values) => {
        localStorage.setItem('howToApplyData', JSON.stringify(values));
        alert('How to Apply data saved successfully!');
        setViewMode('table');
    };

    // Table view for displaying content
    if (viewMode === 'table') {
        return (
            <div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">How to Apply</h3>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 className="font-medium mb-2">{initialValues.title}</h4>
                        <p className="text-gray-600">{initialValues.description}</p>
                    </div>

                    <h4 className="font-medium mb-3">Application Steps</h4>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Step</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {initialValues.steps && initialValues.steps.map ?
                                    initialValues.steps.map((step, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {step.step || `Step ${index + 1}`}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {step.description || 'No description available'}
                                            </td>
                                        </tr>
                                    ))
                                    : (
                                        <tr>
                                            <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">
                                                No application steps defined
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Contact Information</h4>
                        <p className="text-gray-600">{initialValues.contactInfo}</p>
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
            validationSchema={HowToApplySchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched }) => (
                <Form className="space-y-6">
                    <div className="border-b pb-4">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">How to Apply Information</h3>

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
                            <label className="block text-sm font-medium text-gray-700">Application Steps</label>
                            <FieldArray name="steps">
                                {({ push, remove }) => (
                                    <div className="space-y-4 mt-2">
                                        {values.steps && values.steps.map((_, index) => (
                                            <div key={index} className="p-4 border rounded-md bg-gray-50">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="font-medium">Step {index + 1}</h4>
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="text-red-500 text-sm hover:text-red-700"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block text-sm text-gray-700">Step Title</label>
                                                    <Field
                                                        name={`steps.${index}.step`}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-700">Description</label>
                                                    <Field
                                                        as="textarea"
                                                        name={`steps.${index}.description`}
                                                        rows="2"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => push({ step: '', description: '' })}
                                            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                                        >
                                            Add Step
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">Contact Information</label>
                            <Field
                                as="textarea"
                                name="contactInfo"
                                rows="3"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                            />
                            {errors.contactInfo && touched.contactInfo && (
                                <div className="text-red-500 text-sm">{errors.contactInfo}</div>
                            )}
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

export default HowToApply;