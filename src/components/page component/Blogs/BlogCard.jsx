import React from 'react';

const BlogCard = ({ blog, onView, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden flex flex-col justify-between">
            <div className="p-6 flex-1 flex flex-col">

                <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                        {blog.category}
                    </span>
                    <span className="text-gray-400 text-xs">
                        {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                </div>


                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {blog.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                </p>
            </div>


            <div className="px-6 pb-6 flex justify-between items-center gap-2">
                <span className="text-xm text-gray-500 font-medium">By {blog.author}</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => onView(blog)}
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm transition"
                    >
                        View
                    </button>
                    <button
                        onClick={() => onEdit(blog)}
                        className="px-3 py-1 bg-[rgb(191,23,23)] text-white rounded hover:bg-red-700 text-sm transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(blog)}
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
