import React, { useState } from 'react';
import ContactTable from '../page component/ContactUs/ContactTable';
import AddContact from '../page component/ContactUs/AddContact';
import EditContact from '../page component/ContactUs/EditContact';
import DeleteContact from '../page component/ContactUs/DeleteContact';
import ViewContact from '../page component/ContactUs/ViewContact';


const Contact = () => {
    const [contacts, setContacts] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1 (555) 123-4567',
            subject: 'Inquiry about admission',
            message: 'I would like to know more about the admission process.',
            department: 'Administration',
            priority: 'High',
            status: 'New'

        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+1 (555) 987-6543',
            subject: 'Scholarship details',
            message: 'Could you provide information on available scholarships?',
            department: 'Admissions',
            priority: 'Medium',
            status: 'In Progress'
        },
        {
            id: 3,
            name: 'Robert Johnson',
            email: 'robert@example.com',
            phone: '+1 (555) 456-7890',
            subject: 'Course schedule',
            message: 'I want to know the upcoming semester schedule.',
            department: 'Student Services',
            priority: 'Low',
            status: 'Resolved'
        }
    ]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);


    const handleAddContact = (newContact) => {
        const id = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
        setContacts([...contacts, { ...newContact, id }]);
        setIsAddModalOpen(false);
    };

    const handleEditContact = (updatedContact) => {
        setContacts(contacts.map(contact =>
            contact.id === updatedContact.id ? updatedContact : contact
        ));
        setIsEditModalOpen(false);
        setSelectedContact(null);
    };


    const handleDeleteContact = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id));
        setIsDeleteModalOpen(false);
        setSelectedContact(null);
    };


    const openEditModal = (contact) => {
        setSelectedContact(contact);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (contact) => {
        setSelectedContact(contact);
        setIsDeleteModalOpen(true);
    };

    const openViewModal = (contact) => {
        setSelectedContact(contact);
        setIsViewModalOpen(true);
    };

    return (
        <div className="pt-20 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Contact Messages</h1>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-[rgb(191,23,23)]  text-white px-4 py-2 rounded-md hover:bg-gray-500 flex items-center"
                    >
                        <i className="fas fa-plus mr-2"></i> Add Contact
                    </button>
                </div>

                <ContactTable
                    contacts={contacts}
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                    onView={openViewModal}
                />

                {isAddModalOpen && (
                    <AddContact
                        onClose={() => setIsAddModalOpen(false)}
                        onSave={handleAddContact}
                    />
                )}

                {isEditModalOpen && (
                    <EditContact
                        contact={selectedContact}
                        onClose={() => {
                            setIsEditModalOpen(false);
                            setSelectedContact(null);
                        }}
                        onSave={handleEditContact}
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteContact
                        contact={selectedContact}
                        onClose={() => {
                            setIsDeleteModalOpen(false);
                            setSelectedContact(null);
                        }}
                        onConfirm={handleDeleteContact}
                    />
                )}

                {isViewModalOpen && (
                    <ViewContact
                        contact={selectedContact}
                        onClose={() => {
                            setIsViewModalOpen(false);
                            setSelectedContact(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Contact;
