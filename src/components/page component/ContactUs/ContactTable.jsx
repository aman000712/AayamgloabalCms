import React from 'react';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

const ContactTable = ({ contacts, onEdit, onDelete, onView }) => {
    const getPriorityBadge = (priority) => {
        const priorityClasses = {
            High: 'bg-red-100 text-red-800',
            Medium: 'bg-yellow-100 text-yellow-800',
            Low: 'bg-green-100 text-green-800'
        };
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityClasses[priority]}`}>
                {priority}
            </span>
        );
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            New: 'bg-blue-100 text-blue-800',
            "In Progress": 'bg-yellow-100 text-yellow-800',
            Resolved: 'bg-green-100 text-green-800',
        };
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {(!contacts || contacts.length === 0) ? (
                        <tr>
                            <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                                No contacts found. Add your first contact!
                            </td>
                        </tr>
                    ) : (
                        contacts.map((contact) => (
                            <tr key={contact.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.subject}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex flex-col space-y-1">
                                        <span>{contact.message.length > 40 ? contact.message.substring(0, 40) + "..." : contact.message}</span>

                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{getPriorityBadge(contact.priority)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(contact.status)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center gap-3">
                                    <button onClick={() => onEdit(contact)} className="text-blue-600 hover:text-blue-900">
                                        <FiEdit size={18} />
                                    </button>
                                    <button onClick={() => onDelete(contact)} className="text-red-600 hover:text-red-900">
                                        <FiTrash2 size={18} />
                                    </button>
                                    <button onClick={() => onView(contact)} className="text-indigo-600 hover:text-indigo-900">
                                        <FiEye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ContactTable;
