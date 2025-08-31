import React, { useState, useEffect } from "react";
import AddBlog from "../page component/Blogs/AddBlog";
import EditBlog from "../page component/Blogs/EditBlog";
import ViewBlog from "../page component/Blogs/ViewBlog";
import DeleteBlog from "../page component/Blogs/DeleteBlog";
import BlogCategories from "../page component/Blogs/BlogCategories";
import BlogTable from "../page component/Blogs/BlogTable";

const Blogs = () => {
  const [blogs, setBlogs] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("blogs")) || [
        {
          id: 1,
          title: "The myth of Housekeeping",
          content:
            "Housekeeping is often seen as a routine and behind-the-scenes operation...",
          excerpt:
            "Housekeeping is often seen as a routine and behind-the-scenes operation in the household industry...",
          category: "Housekeeping",
          author: "Anne Chlain",
          date: "2005-06-10",
        },
        {
          id: 2,
          title: "Field Visit to Hotel Reception",
          content:
            "As part of the practical training for Hotel Management students...",
          excerpt:
            "As part of the practical training for Hotel Management students...",
          category: "Field Visit",
          author: "Admin",
          date: "2023-05-15",
        },
        {
          id: 3,
          title: "Playing with numbers",
          content:
            "Playing with Numbers at Angam Global School offers students a unique and innovative way...",
          excerpt:
            "Playing with Numbers at Angam Global School offers students a unique and innovative way...",
          category: "General Accounting",
          author: "Home Video",
          date: "2023-02-20",
        },
      ]
    );
  });

  const [currentView, setCurrentView] = useState("list");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const persistBlogs = (updated) => {
    setBlogs(updated);
    localStorage.setItem("blogs", JSON.stringify(updated));
  };

  const categories = [
    "All",
    "Kitchen Arts",
    "Field Visit",
    "Housekeeping",
    "General Accounting",
  ];
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  // Handlers
  const handleAddBlog = (newBlog) => {
    const id = blogs.length > 0 ? Math.max(...blogs.map((b) => b.id)) + 1 : 1;
    persistBlogs([...blogs, { ...newBlog, id }]);
    setCurrentView("list");
  };

  const handleUpdateBlog = (updatedBlog) => {
    persistBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
    setCurrentView("list");
  };

  const handleDeleteBlog = (id) => {
    persistBlogs(blogs.filter((b) => b.id !== id));
    setCurrentView("list");
  };

  const handleViewBlog = (blog) => {
    setSelectedBlog(blog);
    setCurrentView("view");
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setCurrentView("edit");
  };

  const handleDeleteClick = (blog) => {
    setSelectedBlog(blog);
    setCurrentView("delete");
  };

  const renderContent = () => {
    switch (currentView) {
      case "add":
        return (
          <AddBlog
            onAdd={handleAddBlog}
            onCancel={() => setCurrentView("list")}
          />
        );
      case "edit":
        return (
          <EditBlog
            blog={selectedBlog}
            onUpdate={handleUpdateBlog}
            onCancel={() => setCurrentView("list")}
          />
        );
      case "view":
        return (
          <ViewBlog
            blog={selectedBlog}
            onClose={() => setCurrentView("list")}
          />
        );
      case "delete":
        return (
          <DeleteBlog
            blog={selectedBlog}
            onConfirm={handleDeleteBlog}
            onCancel={() => setCurrentView("list")}
          />
        );
      default:
        return (
          <>
            <div className="flex justify-between items-center mb-6 pt-20">
              <h1 className="text-2xl font-bold text-gray-800">
                Blog Management
              </h1>
              <button
                onClick={() => setCurrentView("add")}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Add New Blog
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
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
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">{renderContent()}</div>
    </div>
  );
};

export default Blogs;
