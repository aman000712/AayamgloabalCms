import React from 'react';

const DeleteBlog = ({ blog, onConfirm, onCancel }) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Delete Blog Post</h2>
            <p className="mb-6 text-gray-600">
                Are you sure you want to delete the blog post titled
                <span className="font-semibold text-gray-800"> "{blog.title}"</span>?
                This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4">
                <button
                    onClick={onCancel}
                    className="px-6 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={() => onConfirm(blog.id)}
                    className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteBlog;
