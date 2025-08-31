import React from "react";

const DeleteTeamMember = ({ member, onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-xl shadow-lg w-full max-w-xs text-center">
                <h2 className="text-lg font-semibold mb-4 text-[rgb(191,23,23)]">
                    Delete Team Member
                </h2>
                <p className="text-gray-700 mb-4">
                    Are you sure you want to delete <span className="font-semibold">{member.name}</span>?
                </p>
                <div className="flex justify-center space-x-3">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100 text-sm transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(member.id)}
                        className="px-3 py-1 bg-[rgb(191,23,23)] text-white rounded hover:bg-red-800 text-sm transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteTeamMember;
