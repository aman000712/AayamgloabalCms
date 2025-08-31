import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export const GetToKnowUs = ({ initialData, onSubmit, onCancel }) => {
    const formik = useFormik({
        initialValues: {
            subtitle: initialData?.subtitle || "",
            title: initialData?.title || "",
            description: initialData?.description || "",
            images: [],
            imageUrls: initialData?.imageUrls || []
        },
        validationSchema: Yup.object({
            subtitle: Yup.string().required("Subtitle is required"),
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
        }),
        onSubmit: (values) => {
            const imageUrls = values.images.length > 0
                ? values.images.map(file => URL.createObjectURL(file))
                : values.imageUrls;

            onSubmit({
                subtitle: values.subtitle,
                title: values.title,
                description: values.description,
                imageUrls: imageUrls
            });
        },
    });

    useEffect(() => {
        if (formik.values.images.length > 0) {
            const objectUrls = formik.values.images.map(file => URL.createObjectURL(file));
            formik.setFieldValue('imageUrls', objectUrls);

            return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
        }
    }, [formik.values.images]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Get to Know Us Section
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Add subtitle, title, description, and multiple images.
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subtitle <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="subtitle"
                            placeholder="Enter subtitle"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.subtitle}
                            className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition 
                ${formik.touched.subtitle && formik.errors.subtitle
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-indigo-400"
                                }`}
                        />
                        {formik.touched.subtitle && formik.errors.subtitle && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.subtitle}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                            className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition 
                ${formik.touched.title && formik.errors.title
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-indigo-400"
                                }`}
                        />
                        {formik.touched.title && formik.errors.title && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            placeholder="Enter description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition 
                ${formik.touched.description && formik.errors.description
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-indigo-400"
                                }`}
                        />
                        {formik.touched.description && formik.errors.description && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.description}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Images <span className="!text-gray-400">(or you can add multiple Images)</span><span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(event) => {
                                formik.setFieldValue("images", Array.from(event.currentTarget.files));
                            }}
                            onBlur={formik.handleBlur}
                            className="block w-full text-sm text-gray-600 
                         file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 
                         file:text-sm file:font-medium 
                         file:bg-indigo-50 file:text-indigo-600 
                         hover:file:bg-indigo-100"
                        />
                        {formik.touched.images && formik.errors.images && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.images}</p>
                        )}

                        {(formik.values.imageUrls.length > 0 || initialData?.imageUrls?.length > 0) && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Image Previews:</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {(formik.values.imageUrls.length > 0 ? formik.values.imageUrls : initialData.imageUrls)
                                        .map((url, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={url}
                                                    alt={`preview-${index}`}
                                                    className="h-28 w-full object-cover rounded-lg border"
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-1/3 py-2.5 rounded-lg bg-gray-300 text-gray-700 text-sm font-medium shadow-md hover:opacity-90 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-2/3 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow-md hover:opacity-90 transition"
                        >
                            Save Section
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};