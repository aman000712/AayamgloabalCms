import React from 'react';
import BlogCard from './BlogCard';

const BlogTable = ({ blogs, onView, onEdit, onDelete }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  gap-6 p-6">
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))
            ) : (
                <p className="col-span-full text-center text-gray-500 py-10">
                    No blogs available
                </p>
            )}
        </div>

    );
};

export default BlogTable;
