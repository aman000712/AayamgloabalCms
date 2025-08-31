import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Team = ({ initialData, onSubmit, onCancel }) => {
    const isEditing = Boolean(initialData?.id);
    const accentColor = "rgb(191,23,23)"; // logo color theme

    const formik = useFormik({
        initialValues: {
            name: initialData?.name || "",
            role: initialData?.role || "",
            description: initialData?.description || "",
            image: null,
            imageUrl: initialData?.imageUrl || ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            role: Yup.string().required("Role is required"),
            description: Yup.string().required("Description is required"),
        }),
        onSubmit: (values) => {
            const imageUrl = values.image instanceof File
                ? URL.createObjectURL(values.image)
                : values.imageUrl;

            onSubmit({
                name: values.name,
                role: values.role,
                description: values.description,
                image: values.image,
                imageUrl: imageUrl
            });
        },
    });

    useEffect(() => {
        if (formik.values.image instanceof File) {
            const objectUrl = URL.createObjectURL(formik.values.image);
            formik.setFieldValue('imageUrl', objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [formik.values.image]);

    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-50 pt-24 px-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {isEditing ? 'Edit Team Member' : 'Add Team Member'}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage team member name, role, description, and image.
                    </p>
                </div>


                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {["name", "role"].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name={field}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values[field]}
                                placeholder={`Enter ${field}`}
                                className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched[field] && formik.errors[field]
                                    ? "border-red-500 focus:ring-red-400"
                                    : `border-gray-300 focus:ring-[${accentColor}]`
                                    }`}
                            />
                            {formik.touched[field] && formik.errors[field] && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors[field]}</p>
                            )}
                        </div>
                    ))}

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            placeholder="Enter a brief bio or description"
                            className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched.description && formik.errors.description
                                ? "border-red-500 focus:ring-red-400"
                                : `border-gray-300 focus:ring-[${accentColor}]`
                                }`}
                        />
                        {formik.touched.description && formik.errors.description && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.description}</p>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])}
                            className="block w-full text-sm text-gray-600 
              file:mr-4 file:py-2 file:px-4 file:rounded-lg 
              file:border-0 file:text-sm file:font-medium 
              file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                        />
                        {(formik.values.imageUrl || initialData?.imageUrl) && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                                <img
                                    src={formik.values.imageUrl || initialData.imageUrl}
                                    alt="Profile Preview"
                                    className="h-40 w-40 object-contain rounded-full mx-auto border"
                                />
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-1/3 py-2.5 rounded-lg bg-gray-300 text-gray-700 text-sm font-medium shadow-md hover:opacity-90 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-2/3 py-2.5 rounded-lg text-white text-sm font-medium shadow-md transition hover:opacity-90"
                            style={{ backgroundColor: accentColor }}
                        >
                            {isEditing ? 'Update Team Member' : 'Save Team Member'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
