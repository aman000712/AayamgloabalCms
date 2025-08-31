import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Programs = ({ initialData, onSubmit, onCancel }) => {
    const formik = useFormik({
        initialValues: {
            programTitle: initialData?.programTitle || "",
            programSubtitle: initialData?.programSubtitle || "",
            description: initialData?.description || "",
            programImage: null,
            programImageUrl: initialData?.programImageUrl || ""
        },
        validationSchema: Yup.object({
            programTitle: Yup.string().required("Program title is required"),
            programSubtitle: Yup.string().required("Subtitle is required"),
            description: Yup.string().required("Description is required"),
        }),
        onSubmit: (values) => {
            const programImageUrl = values.programImage instanceof File
                ? URL.createObjectURL(values.programImage)
                : values.programImageUrl;

            onSubmit({
                programTitle: values.programTitle,
                programSubtitle: values.programSubtitle,
                description: values.description,
                programImage: values.programImage,
                programImageUrl: programImageUrl
            });
        },
    });

    // Handle image preview when image changes
    useEffect(() => {
        if (formik.values.programImage instanceof File) {
            const objectUrl = URL.createObjectURL(formik.values.programImage);
            formik.setFieldValue('programImageUrl', objectUrl);

            // Clean up
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [formik.values.programImage]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                {/* Heading */}
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Programs Section
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage program title, subtitle, description, and image.
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Program Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="programTitle"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.programTitle}
                            placeholder="Enter program title"
                            className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched.programTitle && formik.errors.programTitle
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-indigo-400"
                                }`}
                        />
                        {formik.touched.programTitle && formik.errors.programTitle && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.programTitle}
                            </p>
                        )}
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subtitle <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="programSubtitle"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.programSubtitle}
                            placeholder="Enter subtitle"
                            className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched.programSubtitle && formik.errors.programSubtitle
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-indigo-400"
                                }`}
                        />
                        {formik.touched.programSubtitle &&
                            formik.errors.programSubtitle && (
                                <p className="text-red-500 text-xs mt-1">
                                    {formik.errors.programSubtitle}
                                </p>
                            )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            placeholder="Enter program description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched.description && formik.errors.description
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-indigo-400"
                                }`}
                        />
                        {formik.touched.description && formik.errors.description && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.description}
                            </p>
                        )}
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Program Image <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            name="programImage"
                            onChange={(event) =>
                                formik.setFieldValue("programImage", event.currentTarget.files[0])
                            }
                            className="block w-full text-sm text-gray-600 
                         file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 
                         file:text-sm file:font-medium 
                         file:bg-indigo-50 file:text-indigo-600 
                         hover:file:bg-indigo-100"
                        />
                        {formik.touched.programImage && formik.errors.programImage && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.programImage}
                            </p>
                        )}

                        {/* Image Preview */}
                        {(formik.values.programImageUrl || initialData?.programImageUrl) && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                                <img
                                    src={formik.values.programImageUrl || initialData.programImageUrl}
                                    alt="Program Preview"
                                    className="h-40 w-full object-contain border rounded"
                                />
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
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
                            Save Program
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};