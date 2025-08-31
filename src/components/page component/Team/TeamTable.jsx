import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaEdit, FaTrash } from "react-icons/fa";

const TeamTable = ({ teamMembers, onEdit, onDelete }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
                <div
                    key={member.id}
                    className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center relative hover:shadow-lg transition"
                >
                    {/* Profile Picture */}
                    <img
                        src={member.profilePicture}
                        alt={member.name}
                        className="w-24 h-24 object-cover rounded-full border mb-3"
                    />

                    {/* Name & Designation */}
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-gray-500 text-sm">{member.designation}</p>

                    {/* Short Bio */}
                    <p className="mt-2 text-gray-700 text-sm">{member.bio}</p>

                    {/* Social Links */}
                    <div className="flex mt-3 space-x-3">
                        {member.linkedin && (
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:text-blue-800"
                            >
                                <FaLinkedin size={18} />
                            </a>
                        )}
                        {member.twitter && (
                            <a
                                href={member.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-600"
                            >
                                <FaTwitter size={18} />
                            </a>
                        )}
                        {member.facebook && (
                            <a
                                href={member.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-800 hover:text-blue-900"
                            >
                                <FaFacebook size={18} />
                            </a>
                        )}
                    </div>

                    {/* Edit/Delete Buttons */}
                    <div className="flex space-x-2 mt-4">
                        <button
                            onClick={() => onEdit(member)}
                            className="flex items-center px-3 py-1 bg-[rgb(191,23,23)] text-white rounded hover:bg-red-800 text-sm transition"
                        >
                            <FaEdit className="mr-1" /> Edit
                        </button>
                        <button
                            onClick={() => onDelete(member)}
                            className="flex items-center px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm transition"
                        >
                            <FaTrash className="mr-1" /> Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TeamTable;
