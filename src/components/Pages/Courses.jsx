import React, { useState, useEffect } from 'react';
import CourseTable from '../page component/Courses/CourseTable';
import AddCourse from '../page component/Courses/AddCourse';
import EditCourse from '../page component/Courses/EditCourse';
import DeleteCourse from '../page component/Courses/DeleteCourse';

const localStorageKey = 'school-cms-courses';

const initialCourses = [
    {
        id: 1,
        name: 'Hotel Management',
        level: '+2',
        duration: '2 years'
    },
    {
        id: 2,
        name: 'General Management',
        level: '+2',
        duration: '2 years'
    },
    {
        id: 3,
        name: 'Diploma in Hotel Management (DHM)',
        level: 'Diploma',
        duration: '3 years'
    }
];

const Courses = () => {
    // ✅ Load from localStorage first, else fallback to initialCourses
    const [courses, setCourses] = useState(() => {
        const saved = localStorage.getItem(localStorageKey);
        return saved ? JSON.parse(saved) : initialCourses;
    });

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    // ✅ Save to localStorage whenever courses change
    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(courses));
    }, [courses]);

    const handleAddCourse = (newCourse) => {
        const id = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
        setCourses([...courses, { ...newCourse, id }]);
        setIsAddModalOpen(false);
    };

    const handleEditCourse = (updatedCourse) => {
        setCourses(courses.map(course =>
            course.id === updatedCourse.id ? updatedCourse : course
        ));
        setIsEditModalOpen(false);
        setSelectedCourse(null);
    };

    const handleDeleteCourse = (id) => {
        setCourses(courses.filter(course => course.id !== id));
        setIsDeleteModalOpen(false);
        setSelectedCourse(null);
    };

    const openEditModal = (course) => {
        setSelectedCourse(course);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (course) => {
        setSelectedCourse(course);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="pt-20 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-[rgb(191,23,23)] text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center transition"
                    >
                        <i className="fas fa-plus mr-2"></i> Add Course
                    </button>
                </div>

                <CourseTable
                    courses={courses}
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                />

                {isAddModalOpen && (
                    <AddCourse
                        onClose={() => setIsAddModalOpen(false)}
                        onSave={handleAddCourse}
                    />
                )}

                {isEditModalOpen && (
                    <EditCourse
                        course={selectedCourse}
                        onClose={() => {
                            setIsEditModalOpen(false);
                            setSelectedCourse(null);
                        }}
                        onSave={handleEditCourse}
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteCourse
                        course={selectedCourse}
                        onClose={() => {
                            setIsDeleteModalOpen(false);
                            setSelectedCourse(null);
                        }}
                        onConfirm={handleDeleteCourse}
                    />
                )}
            </div>
        </div>
    );
};

export default Courses;
