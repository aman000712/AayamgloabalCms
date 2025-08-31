import React from 'react';

const ViewBlog = ({ blog, onClose }) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl mx-auto">
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{blog.title}</h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                    ✕
                </button>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {blog.category}
                </span>
                <span className="text-gray-600 text-sm">
                    By <span className="font-medium">{blog.author}</span> on{' '}
                    {new Date(blog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </span>
            </div>

            <div className="mb-6">
                <p className="text-gray-700 italic">{blog.excerpt}</p>
            </div>

            <div className="prose max-w-none text-gray-800">
                <p>{blog.content}</p>
            </div>
        </div>
    );
};

export default ViewBlog;
