import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import AddContact from '../page component/ContactUs/AddContact';
import EditContact from '../page component/ContactUs/EditContact';
import DeleteContact from '../page component/ContactUs/DeleteContact';
import ViewContact from '../page component/ContactUs/ViewContact';
import ContactInfo from '../page component/ContactUs/ContactInfo';
import ContactTable from '../page component/ContactUs/ContactTable';

const Contact = () => {
    const [contacts, setContacts] = useState(() => {
        const saved = localStorage.getItem("contacts");
        return saved ? JSON.parse(saved) : [
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
            }
        ];
    });

    const [contactInfo, setContactInfo] = useState(() => {
        const saved = localStorage.getItem("contactInfo");
        return saved ? JSON.parse(saved) : {
            description: "",
            phone: "071553777",
            email: "info@aayamglobal.com",
            address: "Tilottama-2, Janakinagar",
            googleMapUrl: "",
            facebook: "",
            instagram: "",
            twitter: ""
        };
    });

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);
    const [isDeleteInfoConfirmOpen, setIsDeleteInfoConfirmOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);

    useEffect(() => {
        localStorage.setItem("contactInfo", JSON.stringify(contactInfo));
    }, [contactInfo]);

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

    const handleDeleteInfo = () => {
        setContactInfo({ phone: '', email: '', address: '', googleMapUrl: '', facebook: '', instagram: '', twitter: '' });
        setIsDeleteInfoConfirmOpen(false);
    };

    return (
        <div className="pt-20 bg-gray-50 min-h-screen flex flex-col">
            <div className="max-w-7xl mx-auto space-y-10">

                <div className="bg-gray-100 p-4 rounded-lg shadow-md max-w-3xl mx-auto">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-red-600 font-bold text-lg mb-2">CONTACT US</h2>
                            <p className="text-gray-700 mb-2">
                                {contactInfo.description}
                            </p>
                            <p className="flex items-center gap-2 text-gray-800 mb-1 text-sm">
                                <span>📞</span> {contactInfo.phone}
                            </p>
                            <p className="flex items-center gap-2 text-gray-800 mb-1 text-sm">
                                <span>✉️</span> {contactInfo.email}
                            </p>
                            <p className="flex items-center gap-2 text-gray-800 mb-1 text-sm">
                                <span>📍</span> {contactInfo.address}
                            </p>
                        </div>


                        <div className="flex flex-col gap-2 self-start">
                            <button
                                onClick={() => setIsContactInfoOpen(true)}
                                className="bg-[rgb(191,23,23)] text-white p-2 rounded-md hover:bg-gray-500 text-lg flex items-center justify-center"
                            >
                                <FiEdit />
                            </button>
                            <button
                                onClick={() => setIsDeleteInfoConfirmOpen(true)}
                                className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-700 text-lg flex items-center justify-center"
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    </div>
                </div>




                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Contact Messages</h1>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-[rgb(191,23,23)] text-white px-4 py-2 rounded-md hover:bg-gray-500"
                    >
                        + Add Contact
                    </button>
                </div>

                <ContactTable
                    contacts={contacts}
                    onEdit={(c) => { setSelectedContact(c); setIsEditModalOpen(true); }}
                    onDelete={(c) => { setSelectedContact(c); setIsDeleteModalOpen(true); }}
                    onView={(c) => { setSelectedContact(c); setIsViewModalOpen(true); }}
                />

                {isAddModalOpen && <AddContact onClose={() => setIsAddModalOpen(false)} onSave={handleAddContact} />}
                {isEditModalOpen && <EditContact contact={selectedContact} onClose={() => { setIsEditModalOpen(false); setSelectedContact(null); }} onSave={handleEditContact} />}
                {isDeleteModalOpen && <DeleteContact contact={selectedContact} onClose={() => { setIsDeleteModalOpen(false); setSelectedContact(null); }} onConfirm={handleDeleteContact} />}
                {isViewModalOpen && <ViewContact contact={selectedContact} onClose={() => { setIsViewModalOpen(false); setSelectedContact(null); }} />}
                {isContactInfoOpen && <ContactInfo info={contactInfo} onSave={setContactInfo} onClose={() => setIsContactInfoOpen(false)} />}

                {isDeleteInfoConfirmOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-96 text-center shadow-lg">
                            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
                            <p className="mb-6">Are you sure you want to delete the school contact info? This action cannot be undone.</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={handleDeleteInfo}
                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={() => setIsDeleteInfoConfirmOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Contact;
