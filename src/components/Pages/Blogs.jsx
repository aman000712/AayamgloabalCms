import React, { useState } from 'react';
import AddBlog from '../page component/Blogs/AddBlog';
import EditBlog from '../page component/Blogs/EditBlog';
import ViewBlog from '../page component/Blogs/ViewBlog';
import DeleteBlog from '../page component/Blogs/DeleteBlog';
import BlogCategories from '../page component/Blogs/BlogCategories';
import BlogTable from '../page component/Blogs/BlogTable';

const Blogs = () => {
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: "The myth of Housekeeping",
            content: "Housekeeping is often seen as a routine and behind-the-scenes operation...",
            excerpt: "Housekeeping is often seen as a routine and behind-the-scenes operation in the household industry...",
            category: "Housekeeping",
            author: "Anne Chlain",
            date: "2005-06-10"
        },
        {
            id: 2,
            title: "Field Visit to Hotel Reception",
            content: "As part of the practical training for Hotel Management students...",
            excerpt: "As part of the practical training for Hotel Management students...",
            category: "Field Visit",
            author: "Admin",
            date: "2023-05-15"
        },
        {
            id: 3,
            title: "Playing with numbers",
            content: "Playing with Numbers at Angam Global School offers students a unique and innovative way...",
            excerpt: "Playing with Numbers at Angam Global School offers students a unique and innovative way...",
            category: "General Accounting",
            author: "Home Video",
            date: "2023-02-20"
        }
    ]);

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'edit', 'view', 'delete'
    const [selectedBlog, setSelectedBlog] = useState(null);

    const categories = ['All', 'Kitchen Arts', 'Field Visit', 'Housekeeping', 'General Accounting'];

    const filteredBlogs = selectedCategory === 'All'
        ? blogs
        : blogs.filter(blog => blog.category === selectedCategory);

    const handleAddBlog = (newBlog) => {
        const id = blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1;
        setBlogs([...blogs, { ...newBlog, id }]);
        setCurrentView('list');
    };

    const handleUpdateBlog = (updatedBlog) => {
        setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog));
        setCurrentView('list');
    };

    const handleDeleteBlog = (id) => {
        setBlogs(blogs.filter(blog => blog.id !== id));
        setCurrentView('list');
    };

    const handleViewBlog = (blog) => {
        setSelectedBlog(blog);
        setCurrentView('view');
    };

    const handleEditBlog = (blog) => {
        setSelectedBlog(blog);
        setCurrentView('edit');
    };

    const handleDeleteClick = (blog) => {
        setSelectedBlog(blog);
        setCurrentView('delete');
    };

    const renderContent = () => {
        switch (currentView) {
            case 'add':
                return <AddBlog onAdd={handleAddBlog} onCancel={() => setCurrentView('list')} />;
            case 'edit':
                return <EditBlog blog={selectedBlog} onUpdate={handleUpdateBlog} onCancel={() => setCurrentView('list')} />;
            case 'view':
                return <ViewBlog blog={selectedBlog} onClose={() => setCurrentView('list')} />;
            case 'delete':
                return <DeleteBlog blog={selectedBlog} onConfirm={handleDeleteBlog} onCancel={() => setCurrentView('list')} />;
            default:
                return (
                    <>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 pt-20">
                            <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
                            <button
                                onClick={() => setCurrentView('add')}
                                className="px-5 py-2 bg-[rgb(191,23,23)] text-white rounded-xl hover:bg-red-700 transition-colors shadow"
                            >
                                Add New Blog
                            </button>
                        </div>


                        <div className="max-w-2xl mx-auto gap-6">

                            <div className="">
                                <BlogCategories
                                    selectedCategory={selectedCategory}
                                    onSelectCategory={setSelectedCategory}
                                />
                            </div>


                            <div className="lg:col-span-3">
                                <BlogTable
                                    blogs={filteredBlogs}
                                    onView={handleViewBlog}
                                    onEdit={handleEditBlog}
                                    onDelete={handleDeleteClick}
                                />
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {renderContent()}
        </div>
    );
};

export default Blogs;
