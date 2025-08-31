import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export const PrincipleMessage = ({ initialData, onSubmit, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      subtitle: initialData?.subtitle || "",
      title: initialData?.title || "",
      introText: initialData?.introText || "",
      principalImage: null,
      principalImageUrl: initialData?.principalImageUrl || "",
      message: initialData?.message || "",
      principalName: initialData?.principalName || "",
      principalDesignation: initialData?.principalDesignation || "",
    },
    validationSchema: Yup.object({
      subtitle: Yup.string().required("Subtitle is required"),
      title: Yup.string().required("Title is required"),
      introText: Yup.string().required("Intro text is required"),
      message: Yup.string().required("Message is required"),
      principalName: Yup.string().required("Name is required"),
      principalDesignation: Yup.string().required("Designation is required"),
    }),
    onSubmit: (values) => {
      const principalImageUrl = values.principalImage instanceof File
        ? URL.createObjectURL(values.principalImage)
        : values.principalImageUrl;

      onSubmit({
        subtitle: values.subtitle,
        title: values.title,
        introText: values.introText,
        principalImage: values.principalImage,
        principalImageUrl: principalImageUrl,
        message: values.message,
        principalName: values.principalName,
        principalDesignation: values.principalDesignation,
      });
    },
  });

  // Handle image preview when image changes
  useEffect(() => {
    if (formik.values.principalImage instanceof File) {
      const objectUrl = URL.createObjectURL(formik.values.principalImage);
      formik.setFieldValue('principalImageUrl', objectUrl);

      // Clean up
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [formik.values.principalImage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Principal's Message Section
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage subtitle, title, intro text, principal image, and message.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subtitle"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subtitle}
              placeholder="Enter subtitle"
              className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched.subtitle && formik.errors.subtitle
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-400"
                }`}
            />
            {formik.touched.subtitle && formik.errors.subtitle && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.subtitle}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              placeholder="Enter title"
              className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched.title && formik.errors.title
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-400"
                }`}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>
            )}
          </div>

          {/* Intro Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Intro Text <span className="text-red-500">*</span>
            </label>
            <textarea
              name="introText"
              rows={2}
              placeholder="Enter intro text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.introText}
              className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched.introText && formik.errors.introText
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-400"
                }`}
            />
            {formik.touched.introText && formik.errors.introText && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.introText}</p>
            )}
          </div>

          {/* Principal Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Principal Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="principalImage"
              onChange={(event) =>
                formik.setFieldValue("principalImage", event.currentTarget.files[0])
              }
              className="block w-full text-sm text-gray-600 
                         file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 
                         file:text-sm file:font-medium 
                         file:bg-indigo-50 file:text-indigo-600 
                         hover:file:bg-indigo-100"
            />
            {formik.touched.principalImage && formik.errors.principalImage && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.principalImage}</p>
            )}

            {/* Image Preview */}
            {(formik.values.principalImageUrl || initialData?.principalImageUrl) && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                <img
                  src={formik.values.principalImageUrl || initialData.principalImageUrl}
                  alt="Principal Preview"
                  className="h-40 w-40 object-contain rounded-full mx-auto border"
                />
              </div>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Principal's Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              rows={6}
              placeholder="Enter principal's message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched.message && formik.errors.message
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-400"
                }`}
            />
            {formik.touched.message && formik.errors.message && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.message}</p>
            )}
          </div>

          {/* Principal Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Principal Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="principalName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.principalName}
              placeholder="Enter principal's name"
              className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched.principalName && formik.errors.principalName
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-400"
                }`}
            />
            {formik.touched.principalName && formik.errors.principalName && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.principalName}</p>
            )}
          </div>

          {/* Principal Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Principal Designation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="principalDesignation"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.principalDesignation}
              placeholder="Enter designation (e.g., Founder & CEO)"
              className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched.principalDesignation && formik.errors.principalDesignation
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-400"
                }`}
            />
            {formik.touched.principalDesignation && formik.errors.principalDesignation && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.principalDesignation}</p>
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
              Save Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};