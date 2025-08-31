import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditCourse = ({ course, onClose, onSave }) => {
    const initialValues = {
        name: course?.name || '',
        level: course?.level || '+2',
        duration: course?.duration || ''
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'Course name must be at least 3 characters')
            .required('Course name is required'),
        level: Yup.string()
            .required('Level is required'),
        duration: Yup.string()
            .required('Duration is required')
    });

    const handleSubmit = (values) => {
        onSave({ ...course, ...values });
    };

    if (!course) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Edit Course</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting }) => (
                        <Form className="p-4">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Course Name *
                                </label>
                                <Field
                                    type="text"
                                    name="name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter course name"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                                    Level *
                                </label>
                                <Field
                                    as="select"
                                    name="level"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="+2">+2</option>
                                    <option value="Diploma">Diploma</option>
                                </Field>
                                <ErrorMessage name="level" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration *
                                </label>
                                <Field
                                    type="text"
                                    name="duration"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., 2 years"
                                />
                                <ErrorMessage name="duration" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="flex justify-end space-x-2 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                                >
                                    Update Course
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditCourse;