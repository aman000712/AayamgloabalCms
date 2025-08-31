// PageSection/Admission.jsx
import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

const AdmissionSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(10, 'Too Short!')
        .required('Required'),
    admissionProcess: Yup.array().of(
        Yup.object().shape({
            step: Yup.string().required('Required'),
            description: Yup.string().required('Required')
        })
    ),
    scholarshipTitle: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    scholarshipDescription: Yup.string()
        .min(10, 'Too Short!')
        .required('Required'),
    scholarshipTypes: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Required'),
            description: Yup.string().required('Required')
        })
    ),
    scholarshipNote: Yup.string()
        .min(10, 'Too Short!')
        .required('Required')
});

// Default data structure
const defaultAdmissionData = {
    title: 'Admission Process',
    description: 'Join Aayam Global School and embark on a journey of academic excellence and personal growth.',
    admissionProcess: [
        {
            step: 'Application Submission',
            description: 'Complete the online application form with accurate information and required documents.'
        },
        {
            step: 'Document Verification',
            description: 'Our admissions team will review your application and verify all submitted documents.'
        }
    ],
    scholarshipTitle: 'Scholarships & Financial Aid',
    scholarshipDescription: 'At Aayam Global School, we offer scholarships to support talented and deserving students.',
    scholarshipTypes: [
        {
            name: 'Merit-Based Scholarship',
            description: 'Awarded to students with exceptional academic records and achievements.'
        },
        {
            name: 'Need-Based Scholarship',
            description: 'Designed for students who demonstrate financial need and academic potential.'
        }
    ],
    scholarshipNote: 'We believe every student deserves a chance to succeed.'
};

const Admission = ({ viewMode, setViewMode }) => {
    // Safely get data from localStorage with fallback to default
    const getInitialValues = () => {
        try {
            const storedData = localStorage.getItem('admissionData');
            if (!storedData) return defaultAdmissionData;

            const parsedData = JSON.parse(storedData);

            // Ensure all required fields exist with proper fallbacks
            return {
                title: parsedData.title || defaultAdmissionData.title,
                description: parsedData.description || defaultAdmissionData.description,
                admissionProcess: Array.isArray(parsedData.admissionProcess)
                    ? parsedData.admissionProcess
                    : defaultAdmissionData.admissionProcess,
                scholarshipTitle: parsedData.scholarshipTitle || defaultAdmissionData.scholarshipTitle,
                scholarshipDescription: parsedData.scholarshipDescription || defaultAdmissionData.scholarshipDescription,
                scholarshipTypes: Array.isArray(parsedData.scholarshipTypes)
                    ? parsedData.scholarshipTypes
                    : defaultAdmissionData.scholarshipTypes,
                scholarshipNote: parsedData.scholarshipNote || defaultAdmissionData.scholarshipNote
            };
        } catch (error) {
            console.error('Error parsing admission data:', error);
            return defaultAdmissionData;
        }
    };

    const initialValues = getInitialValues();

    const handleSubmit = (values) => {
        localStorage.setItem('admissionData', JSON.stringify(values));
        alert('Admission data saved successfully!');
        setViewMode('table');
    };

    // Table view for displaying content
    if (viewMode === 'table') {
        return (
            <div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Admission Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 className="font-medium mb-2">{initialValues.title}</h4>
                        <p className="text-gray-600">{initialValues.description}</p>
                    </div>

                    <h4 className="font-medium mb-3">Admission Process Steps</h4>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Step</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* SAFE: Check if admissionProcess exists and is an array */}
                                {initialValues.admissionProcess && initialValues.admissionProcess.map ?
                                    initialValues.admissionProcess.map((step, index) => (
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
                                                No admission process steps defined
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Scholarship Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 className="font-medium mb-2">{initialValues.scholarshipTitle}</h4>
                        <p className="text-gray-600">{initialValues.scholarshipDescription}</p>
                    </div>

                    <h4 className="font-medium mb-3">Scholarship Types</h4>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scholarship Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* SAFE: Check if scholarshipTypes exists and is an array */}
                                {initialValues.scholarshipTypes && initialValues.scholarshipTypes.map ?
                                    initialValues.scholarshipTypes.map((scholarship, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {scholarship.name || `Scholarship ${index + 1}`}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {scholarship.description || 'No description available'}
                                            </td>
                                        </tr>
                                    ))
                                    : (
                                        <tr>
                                            <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">
                                                No scholarship types defined
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-600 italic">{initialValues.scholarshipNote}</p>
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
            validationSchema={AdmissionSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched }) => (
                <Form className="space-y-6">
                    {/* Admission Section */}
                    <div className="border-b pb-4">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Admission Information</h3>

                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Admission Title</label>
                            <Field
                                name="title"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                            />
                            {errors.title && touched.title && (
                                <div className="text-red-500 text-sm">{errors.title}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Admission Description</label>
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
                            <label className="block text-sm font-medium text-gray-700">Admission Process Steps</label>
                            <FieldArray name="admissionProcess">
                                {({ push, remove }) => (
                                    <div className="space-y-4 mt-2">
                                        {/* SAFE: Check if values.admissionProcess exists */}
                                        {values.admissionProcess && values.admissionProcess.map((_, index) => (
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
                                                        name={`admissionProcess.${index}.step`}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-700">Description</label>
                                                    <Field
                                                        as="textarea"
                                                        name={`admissionProcess.${index}.description`}
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
                    </div>

                    {/* Scholarship Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Scholarship Information</h3>

                        <div className="mb-4">
                            <label htmlFor="scholarshipTitle" className="block text-sm font-medium text-gray-700">Scholarship Title</label>
                            <Field
                                name="scholarshipTitle"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="scholarshipDescription" className="block text-sm font-medium text-gray-700">Scholarship Description</label>
                            <Field
                                as="textarea"
                                name="scholarshipDescription"
                                rows="4"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Scholarship Types</label>
                            <FieldArray name="scholarshipTypes">
                                {({ push, remove }) => (
                                    <div className="space-y-4 mt-2">
                                        {/* SAFE: Check if values.scholarshipTypes exists */}
                                        {values.scholarshipTypes && values.scholarshipTypes.map((_, index) => (
                                            <div key={index} className="p-4 border rounded-md bg-gray-50">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="font-medium">Scholarship Type {index + 1}</h4>
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="text-red-500 text-sm hover:text-red-700"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block text-sm text-gray-700">Scholarship Name</label>
                                                    <Field
                                                        name={`scholarshipTypes.${index}.name`}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-700">Description</label>
                                                    <Field
                                                        as="textarea"
                                                        name={`scholarshipTypes.${index}.description`}
                                                        rows="2"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => push({ name: '', description: '' })}
                                            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                                        >
                                            Add Scholarship Type
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="scholarshipNote" className="block text-sm font-medium text-gray-700">Scholarship Note</label>
                            <Field
                                as="textarea"
                                name="scholarshipNote"
                                rows="3"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                            />
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

export default Admission;