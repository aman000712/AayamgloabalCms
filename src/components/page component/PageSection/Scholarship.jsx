// PageSection/Scholarship.jsx
import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

const ScholarshipSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(10, 'Too Short!')
        .required('Required'),
    scholarships: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Required'),
            eligibility: Yup.string().required('Required'),
            benefits: Yup.string().required('Required')
        })
    )
});

// Default data structure
const defaultScholarshipData = {
    title: 'Scholarships',
    description: 'Information about scholarships available for students.',
    scholarships: [
        {
            name: 'Merit Scholarship',
            eligibility: 'Students with 95% or above in previous year',
            benefits: '50% tuition fee waiver'
        },
        {
            name: 'Need-Based Scholarship',
            eligibility: 'Students from economically disadvantaged backgrounds',
            benefits: 'Up to 100% tuition fee waiver based on need'
        }
    ]
};

const Scholarship = ({ viewMode, setViewMode }) => {
    // Safely get data from localStorage with fallback to default
    const getInitialValues = () => {
        try {
            const storedData = localStorage.getItem('scholarshipData');
            if (!storedData) return defaultScholarshipData;

            const parsedData = JSON.parse(storedData);

            // Ensure all required fields exist with proper fallbacks
            return {
                title: parsedData.title || defaultScholarshipData.title,
                description: parsedData.description || defaultScholarshipData.description,
                scholarships: Array.isArray(parsedData.scholarships)
                    ? parsedData.scholarships
                    : defaultScholarshipData.scholarships
            };
        } catch (error) {
            console.error('Error parsing scholarship data:', error);
            return defaultScholarshipData;
        }
    };

    const initialValues = getInitialValues();

    const handleSubmit = (values) => {
        localStorage.setItem('scholarshipData', JSON.stringify(values));
        alert('Scholarship data saved successfully!');
        setViewMode('table');
    };

    // Table view for displaying content
    if (viewMode === 'table') {
        return (
            <div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Scholarship Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 className="font-medium mb-2">{initialValues.title}</h4>
                        <p className="text-gray-600">{initialValues.description}</p>
                    </div>

                    <h4 className="font-medium mb-3">Available Scholarships</h4>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scholarship Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eligibility</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benefits</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {initialValues.scholarships && initialValues.scholarships.map ?
                                    initialValues.scholarships.map((scholarship, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {scholarship.name || `Scholarship ${index + 1}`}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {scholarship.eligibility || 'Eligibility criteria not specified'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {scholarship.benefits || 'Benefits not specified'}
                                            </td>
                                        </tr>
                                    ))
                                    : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                                                No scholarships available
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
            validationSchema={ScholarshipSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched }) => (
                <Form className="space-y-6">
                    <div className="border-b pb-4">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Scholarship Information</h3>

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
                            <label className="block text-sm font-medium text-gray-700">Scholarship Programs</label>
                            <FieldArray name="scholarships">
                                {({ push, remove }) => (
                                    <div className="space-y-4 mt-2">
                                        {values.scholarships && values.scholarships.map((_, index) => (
                                            <div key={index} className="p-4 border rounded-md bg-gray-50">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="font-medium">Scholarship {index + 1}</h4>
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="text-red-500 text-sm hover:text-red-700"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="block text-sm text-gray-700">Scholarship Name</label>
                                                        <Field
                                                            name={`scholarships.${index}.name`}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm text-gray-700">Eligibility Criteria</label>
                                                        <Field
                                                            name={`scholarships.${index}.eligibility`}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm text-gray-700">Benefits</label>
                                                        <Field
                                                            name={`scholarships.${index}.benefits`}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => push({ name: '', eligibility: '', benefits: '' })}
                                            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                                        >
                                            Add Scholarship
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

export default Scholarship;