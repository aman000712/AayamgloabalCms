import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const BlogCategories = ({ selectedCategory, onSelectCategory }) => {
    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem("categories");
        return saved
            ? JSON.parse(saved)
            : ["Kitchen Arts", "Field Visit", "Housekeeping", "General Accounting"];
    });

    const [newCategory, setNewCategory] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categories));
    }, [categories]);

    const handleAdd = () => {
        if (newCategory.trim() !== "" && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory("");
        }
    };

    const handleDelete = (index) => {
        setCategories(categories.filter((_, i) => i !== index));
    };

    const handleSaveEdit = (index) => {
        if (editValue.trim() !== "") {
            const updated = [...categories];
            updated[index] = editValue;
            setCategories(updated);

            if (selectedCategory === categories[index]) {
                onSelectCategory(editValue);
            }
        }
        setEditingIndex(null);
        setEditValue("");
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditValue("");
    };

    const filteredCategories = categories.filter((category) =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 w-full">
            <h3 className="text-lg font-semibold mb-3">CATEGORIES</h3>

            <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 mb-3  rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="space-y-3 max-h-60 overflow-y-auto">
                {filteredCategories.map((category, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-between px-2 py-2 rounded-lg cursor-pointer transition-colors ${selectedCategory === category
                            ? "bg-gray-200 text-black font-medium"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            }`}
                        onClick={() => onSelectCategory(category)}
                    >
                        {editingIndex === index ? (
                            <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                className=" !border-none w-full h-full focus:outline-none rounded text-sm text-black "
                                autoFocus
                            />
                        ) : (
                            <span className="truncate max-w-[150px] block">{category}</span>
                        )}

                        <div className="flex items-center gap-2 ml-1 shrink-0">
                            {editingIndex === index ? (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSaveEdit(index);
                                        }}
                                        className="text-green-600 text-xs font-semibold hover:underline"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCancelEdit();
                                        }}
                                        className="text-gray-500 text-xs font-semibold hover:underline"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <FiEdit
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingIndex(index);
                                        setEditValue(category);
                                    }}
                                    className="text-amber-600 text-sm cursor-pointer hover:scale-110 transition-transform"
                                />
                            )}

                            <FiTrash2
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(index);
                                }}
                                className="text-red-600 text-sm cursor-pointer hover:scale-110 transition-transform"
                            />
                        </div>
                    </div>
                ))}
            </div>


            <div className="flex items-center mt-4 gap-2 w-full">
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category"
                    className="flex-grow min-w-0 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-[rgb(191,23,23)]  text-white rounded-lg hover:bg-red-900 whitespace-nowrap"
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default BlogCategories;