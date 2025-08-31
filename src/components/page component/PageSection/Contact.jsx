// Pages/Contact.jsx
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ContactSchema = Yup.object().shape({
    address: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    mapEmbed: Yup.string().url('Must be a valid URL'),
    socialMedia: Yup.object().shape({
        facebook: Yup.string().url('Must be a valid URL'),
        twitter: Yup.string().url('Must be a valid URL'),
        instagram: Yup.string().url('Must be a valid URL'),
        youtube: Yup.string().url('Must be a valid URL')
    })
});

const Contact = () => {
    const initialValues = JSON.parse(localStorage.getItem('contactData')) || {
        address: '123 School Street, City, State, ZIP',
        phone: '+1 (123) 456-7890',
        email: 'info@aayamglobal.com',
        mapEmbed: 'https://www.google.com/maps/embed?pb=...',
        socialMedia: {
            facebook: 'https://facebook.com/aayamglobal',
            twitter: 'https://twitter.com/aayamglobal',
            instagram: 'https://instagram.com/aayamglobal',
            youtube: 'https://youtube.com/aayamglobal'
        }
    };

    const handleSubmit = (values) => {
        localStorage.setItem('contactData', JSON.stringify(values));
        alert('Contact information saved successfully!');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Contact Information</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={ContactSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <Field
                                as="textarea"
                                name="address"
                                rows="3"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                            />
                            {errors.address && touched.address ? (
                                <div className="text-red-500 text-sm">{errors.address}</div>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <Field
                                name="phone"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                            />
                            {errors.phone && touched.phone ? (
                                <div className="text-red-500 text-sm">{errors.phone}</div>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <Field
                                name="email"
                                type="email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                            />
                            {errors.email && touched.email ? (
                                <div className="text-red-500 text-sm">{errors.email}</div>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor="mapEmbed" className="block text-sm font-medium text-gray-700">Google Maps Embed URL</label>
                            <Field
                                name="mapEmbed"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                            />
                            {errors.mapEmbed && touched.mapEmbed ? (
                                <div className="text-red-500 text-sm">{errors.mapEmbed}</div>
                            ) : null}
                        </div>

                        <div className="pt-4 border-t">
                            <h2 className="text-lg font-medium mb-4">Social Media Links</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="socialMedia.facebook" className="block text-sm font-medium text-gray-700">Facebook</label>
                                    <Field
                                        name="socialMedia.facebook"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                    />
                                    {errors.socialMedia && errors.socialMedia.facebook && touched.socialMedia && touched.socialMedia.facebook ? (
                                        <div className="text-red-500 text-sm">{errors.socialMedia.facebook}</div>
                                    ) : null}
                                </div>

                                <div>
                                    <label htmlFor="socialMedia.twitter" className="block text-sm font-medium text-gray-700">Twitter</label>
                                    <Field
                                        name="socialMedia.twitter"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                    />
                                    {errors.socialMedia && errors.socialMedia.twitter && touched.socialMedia && touched.socialMedia.twitter ? (
                                        <div className="text-red-500 text-sm">{errors.socialMedia.twitter}</div>
                                    ) : null}
                                </div>

                                <div>
                                    <label htmlFor="socialMedia.instagram" className="block text-sm font-medium text-gray-700">Instagram</label>
                                    <Field
                                        name="socialMedia.instagram"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                    />
                                    {errors.socialMedia && errors.socialMedia.instagram && touched.socialMedia && touched.socialMedia.instagram ? (
                                        <div className="text-red-500 text-sm">{errors.socialMedia.instagram}</div>
                                    ) : null}
                                </div>

                                <div>
                                    <label htmlFor="socialMedia.youtube" className="block text-sm font-medium text-gray-700">YouTube</label>
                                    <Field
                                        name="socialMedia.youtube"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                    />
                                    {errors.socialMedia && errors.socialMedia.youtube && touched.socialMedia && touched.socialMedia.youtube ? (
                                        <div className="text-red-500 text-sm">{errors.socialMedia.youtube}</div>
                                    ) : null}
                                </div>
                            </div>
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

export default Contact;