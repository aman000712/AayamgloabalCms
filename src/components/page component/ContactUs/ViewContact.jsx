import React from "react";

const ViewContact = ({ contact, onClose }) => {
    if (!contact) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4">View Contact</h2>

                <div className="space-y-2">
                    <p><strong>Name:</strong> {contact.name}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                    <p><strong>Subject:</strong> {contact.subject}</p>
                    <p><strong>Message:</strong> {contact.message}</p>
                    <p><strong>Department:</strong> {contact.department}</p>
                    <p><strong>Priority:</strong> {contact.priority}</p>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewContact;
