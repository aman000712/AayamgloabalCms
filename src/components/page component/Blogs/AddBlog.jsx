import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddBlog = ({ onAdd, onCancel }) => {
    const initialValues = {
        title: '',
        content: '',
        excerpt: '',
        category: '',
        author: '',
        date: '',
        image: null,
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        content: Yup.string().required('Content is required'),
        excerpt: Yup.string().max(150, 'Excerpt must be at most 150 characters'),
        category: Yup.string().required('Category is required'),
        author: Yup.string().required('Author is required'),
        date: Yup.date().required('Date is required'),
    });

    const categories = JSON.parse(localStorage.getItem('categories')) || [
        'Kitchen Arts',
        'Field Visit',
        'Housekeeping',
        'General Accounting',
    ];

    const onSubmit = (values, { resetForm }) => {
        if (values.image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const blogWithImage = { ...values, image: reader.result };
                saveBlog(blogWithImage);
                resetForm();
            };
            reader.readAsDataURL(values.image);
        } else {
            saveBlog(values);
            resetForm();
        }
    };

    const saveBlog = (blog) => {
        const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const updatedBlogs = [blog, ...savedBlogs];
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        onAdd(blog);
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Blog</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <label htmlFor="title" className="block text-gray-700 mb-2 font-medium">
                                Title
                            </label>
                            <Field
                                type="text"
                                id="title"
                                name="title"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                        </div>


                        <div>
                            <label htmlFor="category" className="block text-gray-700 mb-2 font-medium">
                                Category
                            </label>
                            <Field
                                as="select"
                                id="category"
                                name="category"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                        </div>


                        <div>
                            <label htmlFor="author" className="block text-gray-700 mb-2 font-medium">
                                Author
                            </label>
                            <Field
                                type="text"
                                id="author"
                                name="author"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="author" component="div" className="text-red-500 text-sm mt-1" />
                        </div>


                        <div>
                            <label htmlFor="date" className="block text-gray-700 mb-2 font-medium">
                                Date
                            </label>
                            <Field
                                type="date"
                                id="date"
                                name="date"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
                        </div>


                        <div className="md:col-span-2">
                            <label htmlFor="excerpt" className="block text-gray-700 mb-2 font-medium">
                                Excerpt (Max 150 characters)
                            </label>
                            <Field
                                as="textarea"
                                id="excerpt"
                                name="excerpt"
                                rows="3"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="excerpt" component="div" className="text-red-500 text-sm mt-1" />
                        </div>


                        <div className="md:col-span-2">
                            <label htmlFor="content" className="block text-gray-700 mb-2 font-medium">
                                Content
                            </label>
                            <Field
                                as="textarea"
                                id="content"
                                name="content"
                                rows="6"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
                        </div>


                        <div className="md:col-span-2">
                            <label htmlFor="image" className="block text-gray-700 mb-2 font-medium">
                                Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>


                        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-5 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-5 py-2 bg-[rgb(191,23,23)]  text-white rounded-xl hover:bg-red-800 transition-colors"
                            >
                                Add Blog
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddBlog;
