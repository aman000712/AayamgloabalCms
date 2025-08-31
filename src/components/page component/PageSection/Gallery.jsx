// PageSection/Gallery.jsx
import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

const GallerySchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(10, 'Too Short!')
        .required('Required'),
    images: Yup.array().of(
        Yup.object().shape({
            url: Yup.string().required('Required'),
            caption: Yup.string()
        })
    )
});

// Default data structure
const defaultGalleryData = {
    title: 'School Gallery',
    description: 'Explore moments from our school life through our photo gallery.',
    images: [
        {
            url: '',
            caption: 'School Event'
        }
    ]
};

const Gallery = ({ viewMode, setViewMode }) => {
    // Safely get data from localStorage with fallback to default
    const getInitialValues = () => {
        try {
            const storedData = localStorage.getItem('galleryData');
            if (!storedData) return defaultGalleryData;

            const parsedData = JSON.parse(storedData);

            // Ensure all required fields exist with proper fallbacks
            return {
                title: parsedData.title || defaultGalleryData.title,
                description: parsedData.description || defaultGalleryData.description,
                images: Array.isArray(parsedData.images)
                    ? parsedData.images
                    : defaultGalleryData.images
            };
        } catch (error) {
            console.error('Error parsing gallery data:', error);
            return defaultGalleryData;
        }
    };

    const initialValues = getInitialValues();

    const handleSubmit = (values) => {
        localStorage.setItem('galleryData', JSON.stringify(values));
        alert('Gallery data saved successfully!');
        setViewMode('table');
    };

    const handleImageUpload = (event, setFieldValue, index) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFieldValue(`images.${index}.url`, e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Table view for displaying content
    if (viewMode === 'table') {
        return (
            <div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">School Gallery</h3>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 className="font-medium mb-2">{initialValues.title}</h4>
                        <p className="text-gray-600">{initialValues.description}</p>
                    </div>

                    <h4 className="font-medium mb-3">Gallery Images</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {initialValues.images && initialValues.images.map ?
                            initialValues.images.map((image, index) => (
                                <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                                        {image.url ? (
                                            <img src={image.url} alt={image.caption || `Gallery image ${index + 1}`} className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="text-gray-500">No image</span>
                                        )}
                                    </div>
                                    <div className="p-3">
                                        <p className="text-sm text-gray-700">{image.caption || 'No caption'}</p>
                                    </div>
                                </div>
                            ))
                            : (
                                <div className="col-span-3 text-center py-8 text-gray-500">
                                    No images in gallery
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        onClick={() => setViewMode('form')}
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                    >
                        Edit Content
                    </button>
                </div>
            </div>
        );
    }

    // Form view for editing content
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={GallerySchema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue }) => (
                <Form className="space-y-6">
                    <div className="border-b pb-4">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Gallery Information</h3>

                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <Field
                                name="title"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <Field
                                as="textarea"
                                name="description"
                                rows="4"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gallery Images</label>
                            <FieldArray name="images">
                                {({ push, remove }) => (
                                    <div className="space-y-4 mt-2">
                                        {values.images && values.images.map((image, index) => (
                                            <div key={index} className="p-4 border rounded-md bg-gray-50">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="font-medium">Image {index + 1}</h4>
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="text-red-500 text-sm hover:text-red-700"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>

                                                <div className="mb-2">
                                                    <label className="block text-sm text-gray-700">Upload Image</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(event) => handleImageUpload(event, setFieldValue, index)}
                                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                                                    />
                                                    {image.url && (
                                                        <div className="mt-2">
                                                            <img src={image.url} alt="Preview" className="h-32 object-cover rounded" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm text-gray-700">Caption</label>
                                                    <Field
                                                        name={`images.${index}.caption`}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => push({ url: '', caption: '' })}
                                            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                                        >
                                            Add Image
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('table')}
                            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Gallery;