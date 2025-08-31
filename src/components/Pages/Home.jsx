// Pages/Home.jsx
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const HomeSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    subtitle: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!'),
    content: Yup.string()
        .min(10, 'Too Short!')
        .required('Required'),
});

const Home = () => {
    // Load initial values from localStorage if available
    const initialValues = JSON.parse(localStorage.getItem('homeData')) || {
        title: 'Welcome to Aayam Global School',
        subtitle: 'Empowering students for a better future',
        content: 'Aayam Global School is committed to providing quality education...',
    };

    const handleSubmit = (values) => {

        localStorage.setItem('homeData', JSON.stringify(values));
        alert('Home page data saved successfully!');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Home Page Content</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={HomeSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <Field
                                name="title"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                            />
                            {errors.title && touched.title ? (
                                <div className="text-red-500 text-sm">{errors.title}</div>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtitle</label>
                            <Field
                                name="subtitle"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                            />
                            {errors.subtitle && touched.subtitle ? (
                                <div className="text-red-500 text-sm">{errors.subtitle}</div>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                            <Field
                                as="textarea"
                                name="content"
                                rows="6"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                            />
                            {errors.content && touched.content ? (
                                <div className="text-red-500 text-sm">{errors.content}</div>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Home;