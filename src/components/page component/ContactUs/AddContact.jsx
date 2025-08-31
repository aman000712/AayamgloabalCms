import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddContact = ({ onClose, onSave }) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            department: '',
            priority: 'Medium'
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            phone: Yup.string().required('Phone number is required'),
            subject: Yup.string().required('Subject is required'),
            message: Yup.string().required('Message is required'),
            department: Yup.string().required('Department is required'),
            priority: Yup.string().oneOf(['High', 'Medium', 'Low']).required('Priority is required')
        }),
        onSubmit: (values) => {
            onSave(values);
            formik.resetForm();
        }
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-xs p-3 rounded-lg shadow-lg relative text-sm">
                <h2 className="text-base font-semibold mb-2 text-center">Add Contact</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-2">
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            {...formik.getFieldProps('name')}
                            className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:outline-none"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-xs mt-0.5">{formik.errors.name}</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            {...formik.getFieldProps('email')}
                            className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:outline-none"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-xs mt-0.5">{formik.errors.email}</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Phone"
                            {...formik.getFieldProps('phone')}
                            className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:outline-none"
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-red-500 text-xs mt-0.5">{formik.errors.phone}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Subject"
                            {...formik.getFieldProps('subject')}
                            className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:outline-none"
                        />
                        {formik.touched.subject && formik.errors.subject && (
                            <p className="text-red-500 text-xs mt-0.5">{formik.errors.subject}</p>
                        )}
                    </div>

                    <div>
                        <textarea
                            rows="2"
                            placeholder="Message"
                            {...formik.getFieldProps('message')}
                            className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:outline-none"
                        />
                        {formik.touched.message && formik.errors.message && (
                            <p className="text-red-500 text-xs mt-0.5">{formik.errors.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Department"
                            {...formik.getFieldProps('department')}
                            className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:outline-none"
                        />
                        {formik.touched.department && formik.errors.department && (
                            <p className="text-red-500 text-xs mt-0.5">{formik.errors.department}</p>
                        )}
                    </div>

                    <div>
                        <select
                            {...formik.getFieldProps('priority')}
                            className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        {formik.touched.priority && formik.errors.priority && (
                            <p className="text-red-500 text-xs mt-0.5">{formik.errors.priority}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-1 mt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-2 py-1 rounded bg-[rgb(191,23,23)]  text-white hover:bg-blue-700 text-xs"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddContact;
