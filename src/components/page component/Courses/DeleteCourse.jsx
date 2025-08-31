import React from 'react';

const DeleteCourse = ({ course, onClose, onConfirm }) => {
    const handleDelete = () => {
        onConfirm(course.id);
    };

    if (!course) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Delete Course</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="p-4">
                    <p className="text-gray-700 mb-4">
                        Are you sure you want to delete the course <strong>"{course.name}"</strong>? This action cannot be undone.
                    </p>

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
                            Delete Course
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteCourse;