import React from 'react';

const DeleteContact = ({ contact, onClose, onConfirm }) => {
    const handleDelete = () => {
        onConfirm(contact.id);
    };

    if (!contact) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Delete Contact</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="p-4">
                    <p className="text-gray-700 mb-4">
                        Are you sure you want to delete the contact for <strong>"{contact.name}"</strong>? This action cannot be undone.
                    </p>

                    <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                        <h3 className="text-sm font-medium text-red-800">Contact Details</h3>
                        <p className="text-sm text-red-700 mt-1">Email: {contact.email}</p>
                        <p className="text-sm text-red-700">Phone: {contact.phone}</p>
                        <p className="text-sm text-red-700">Department: {contact.department}</p>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                            Delete Contact
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteContact;