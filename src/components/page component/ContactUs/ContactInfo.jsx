import React, { useState } from "react";

const ContactInfo = ({ info, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        description: info.description || "",
        phone: info.phone || "",
        email: info.email || "",
        address: info.address || "",
        googleMapUrl: info.googleMapUrl || "",
        facebook: info.facebook || "",
        instagram: info.instagram || "",
        twitter: info.twitter || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSave(formData); // Update parent state
        onClose();        // Close modal
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-5 w-96 shadow-lg max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
                    Edit Contact Info
                </h3>

                {/* Description */}
                <div className="mb-3">
                    <label className="text-sm text-gray-700 mb-1 block">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Breif description about contact us"
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 text-sm resize-none"
                    />
                </div>

                {/* Phone */}
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="📞 Phone Number"
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 text-sm mb-2"
                />

                {/* Email */}
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="✉️ Email"
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 text-sm mb-2"
                />

                {/* Address */}
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="📍 Address"
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 text-sm mb-2"
                />

                {/* Google Map URL */}
                <input
                    type="text"
                    name="googleMapUrl"
                    value={formData.googleMapUrl}
                    onChange={handleChange}
                    placeholder="Google Map URL"
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 text-sm mb-2"
                />

                {/* Facebook URL */}
                <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="Facebook URL"
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 text-sm mb-2"
                />

                {/* Instagram URL */}
                <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="Instagram URL"
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 text-sm mb-2"
                />

                {/* Twitter URL */}
                <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    placeholder="Twitter URL"
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 text-sm mb-2"
                />

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white px-3 py-1.5 rounded-md hover:bg-gray-600 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-[rgb(191,23,23)] text-white px-3 py-1.5 rounded-md hover:bg-red-700 text-sm"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
