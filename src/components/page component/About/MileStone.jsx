import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Milestone = ({ initialData, onSubmit, onCancel }) => {
    const formik = useFormik({
        initialValues: {
            sectionTitle: initialData?.sectionTitle || "",
            heading: initialData?.heading || "",
            description: initialData?.description || "",
            milestones: initialData?.milestones || [
                { title: "", number: "" },
                { title: "", number: "" },
                { title: "", number: "" },
                { title: "", number: "" },
            ],
        },
        validationSchema: Yup.object({
            sectionTitle: Yup.string().required("Required"),
            heading: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            milestones: Yup.array().of(
                Yup.object({
                    title: Yup.string().required("Required"),
                    number: Yup.number()
                        .typeError("Must be a number")
                        .required("Required"),
                })
            ),
        }),
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                {/* Heading */}
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Milestone Section
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage milestone content dynamically
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Section Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Section Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="sectionTitle"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.sectionTitle}
                            placeholder="Section Title"
                            className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched.sectionTitle && formik.errors.sectionTitle
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-indigo-400"
                                }`}
                        />
                        {formik.touched.sectionTitle && formik.errors.sectionTitle && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.sectionTitle}
                            </p>
                        )}
                    </div>

                    {/* Heading */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Heading <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="heading"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.heading}
                            placeholder="Heading"
                            className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched.heading && formik.errors.heading
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-indigo-400"
                                }`}
                        />
                        {formik.touched.heading && formik.errors.heading && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.heading}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            rows={3}
                            placeholder="Description"
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

                    {/* Milestones */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-gray-700">Milestones</h3>
                        {formik.values.milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-50 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name={`milestones[${index}].title`}
                                        placeholder="Title"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={milestone.title}
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 ${formik.touched.milestones?.[index]?.title &&
                                            formik.errors.milestones?.[index]?.title
                                            ? "border-red-500 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-indigo-400"
                                            }`}
                                    />
                                    {formik.touched.milestones?.[index]?.title &&
                                        formik.errors.milestones?.[index]?.title && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {formik.errors.milestones[index].title}
                                            </p>
                                        )}
                                </div>

                                {/* Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name={`milestones[${index}].number`}
                                        placeholder="Number"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={milestone.number}
                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 ${formik.touched.milestones?.[index]?.number &&
                                            formik.errors.milestones?.[index]?.number
                                            ? "border-red-500 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-indigo-400"
                                            }`}
                                    />
                                    {formik.touched.milestones?.[index]?.number &&
                                        formik.errors.milestones?.[index]?.number && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {formik.errors.milestones[index].number}
                                            </p>
                                        )}
                                </div>
                            </div>
                        ))}
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
                            Save Section
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};