import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EditContact = ({ contact, onClose, onSave }) => {
    if (!contact) return null;

    const formik = useFormik({
        initialValues: {
            name: contact.name || '',
            email: contact.email || '',
            phone: contact.phone || '',
            subject: contact.subject || '',
            message: contact.message || '',
            department: contact.department || '',
            priority: contact.priority || 'Low',
            status: contact.status || 'New'
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            phone: Yup.string().required('Phone is required'),
            subject: Yup.string().required('Subject is required'),
            message: Yup.string().required('Message is required'),
            department: Yup.string().required('Department is required'),
            priority: Yup.string().oneOf(['High', 'Medium', 'Low']).required('Priority is required'),
            status: Yup.string().oneOf(['New', 'In Progress', 'Resolved']).required('Status is required')
        }),
        onSubmit: (values) => {
            onSave({ ...contact, ...values });
        }
    });

    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
                <h2 className="text-2xl font-semibold mb-4">Edit Contact</h2>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.subject}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.subject && formik.errors.subject ? (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.subject}</p>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            name="message"
                            rows="4"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.message}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.message && formik.errors.message ? (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.message}</p>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <input
                            type="text"
                            name="department"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.department}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.department && formik.errors.department ? (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.department}</p>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Priority</label>
                        <select
                            name="priority"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.priority}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        {formik.touched.priority && formik.errors.priority ? (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.priority}</p>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            name="status"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.status}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                        {formik.touched.status && formik.errors.status ? (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.status}</p>
                        ) : null}
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[rgb(191,23,23)]  text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditContact;
