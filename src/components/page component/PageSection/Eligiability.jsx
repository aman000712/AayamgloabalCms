// PageSection/Eligiability.jsx
import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

const EligiabilitySchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(10, 'Too Short!')
        .required('Required'),
    eligibilityCriteria: Yup.array().of(
        Yup.object().shape({
            criteria: Yup.string().required('Required'),
            description: Yup.string().required('Required')
        })
    )
});

// Default data structure
const defaultEligiabilityData = {
    title: 'Eligibility Criteria',
    description: 'Check the eligibility requirements for admission to Aayam Global School.',
    eligibilityCriteria: [
        {
            criteria: 'Age Requirement',
            description: 'Student must be at least 5 years old for Grade 1 admission.'
        },
        {
            criteria: 'Academic Records',
            description: 'Previous year report card must be submitted for evaluation.'
        }
    ]
};

const Eligiability = ({ viewMode, setViewMode }) => {
    // Safely get data from localStorage with fallback to default
    const getInitialValues = () => {
        try {
            const storedData = localStorage.getItem('eligiabilityData');
            if (!storedData) return defaultEligiabilityData;

            const parsedData = JSON.parse(storedData);

            // Ensure all required fields exist with proper fallbacks
            return {
                title: parsedData.title || defaultEligiabilityData.title,
                description: parsedData.description || defaultEligiabilityData.description,
                eligibilityCriteria: Array.isArray(parsedData.eligiabilityCriteria)
                    ? parsedData.eligiabilityCriteria
                    : defaultEligiabilityData.eligibilityCriteria
            };
        } catch (error) {
            console.error('Error parsing eligibility data:', error);
            return defaultEligiabilityData;
        }
    };

    const initialValues = getInitialValues();

    const handleSubmit = (values) => {
        localStorage.setItem('eligiabilityData', JSON.stringify(values));
        alert('Eligibility data saved successfully!');
        setViewMode('table');
    };

    // Table view for displaying content
    if (viewMode === 'table') {
        return (
            <div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Eligibility Criteria</h3>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 className="font-medium mb-2">{initialValues.title}</h4>
                        <p className="text-gray-600">{initialValues.description}</p>
                    </div>

                    <h4 className="font-medium mb-3">Eligibility Requirements</h4>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criteria</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {initialValues.eligibilityCriteria && initialValues.eligibilityCriteria.map ?
                                    initialValues.eligibilityCriteria.map((criterion, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {criterion.criteria || `Criterion ${index + 1}`}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {criterion.description || 'No description available'}
                                            </td>
                                        </tr>
                                    ))
                                    : (
                                        <tr>
                                            <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">
                                                No eligibility criteria defined
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
            validationSchema={EligiabilitySchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched }) => (
                <Form className="space-y-6">
                    <div className="border-b pb-4">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Eligibility Information</h3>

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
                            <label className="block text-sm font-medium text-gray-700">Eligibility Criteria</label>
                            <FieldArray name="eligibilityCriteria">
                                {({ push, remove }) => (
                                    <div className="space-y-4 mt-2">
                                        {values.eligibilityCriteria && values.eligibilityCriteria.map((_, index) => (
                                            <div key={index} className="p-4 border rounded-md bg-gray-50">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="font-medium">Criterion {index + 1}</h4>
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="text-red-500 text-sm hover:text-red-700"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block text-sm text-gray-700">Criteria Title</label>
                                                    <Field
                                                        name={`eligibilityCriteria.${index}.criteria`}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-700">Description</label>
                                                    <Field
                                                        as="textarea"
                                                        name={`eligibilityCriteria.${index}.description`}
                                                        rows="2"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => push({ criteria: '', description: '' })}
                                            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                                        >
                                            Add Criterion
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

export default Eligiability;