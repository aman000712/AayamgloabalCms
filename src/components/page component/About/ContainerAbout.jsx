import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export const ContainerAbout = ({ sectionName, initialData, onSubmit, onCancel }) => {
  // Load from localStorage
  const savedData = JSON.parse(localStorage.getItem("containerAboutData")) || {};

  const formik = useFormik({
    initialValues: {
      bannerTitle: savedData.title || initialData?.title || "",
      bannerDescription: savedData.description || initialData?.description || "",
      bannerImage: null,
      imageUrl: savedData.imageUrl || initialData?.imageUrl || ""
    },
    validationSchema: Yup.object({
      bannerTitle: Yup.string().required("Title is required"),
      bannerDescription: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      const finalData = {
        title: values.bannerTitle,
        description: values.bannerDescription,
        imageUrl: values.imageUrl, // already Base64
      };

      // Save to localStorage
      localStorage.setItem("containerAboutData", JSON.stringify(finalData));

      onSubmit(finalData);
    },
  });

  // Convert image to Base64 when uploaded
  useEffect(() => {
    if (formik.values.bannerImage instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("imageUrl", reader.result); // Base64 string
      };
      reader.readAsDataURL(formik.values.bannerImage);
    }
  }, [formik.values.bannerImage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 p-8">

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">{sectionName}</h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter the image, title, and description for this section.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="bannerTitle"
              placeholder="Enter banner title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bannerTitle}
              className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition 
                ${formik.touched.bannerTitle && formik.errors.bannerTitle
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-400"
                }`}
            />
            {formik.touched.bannerTitle && formik.errors.bannerTitle && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.bannerTitle}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="bannerDescription"
              rows={4}
              placeholder="Enter banner description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bannerDescription}
              className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition 
                ${formik.touched.bannerDescription && formik.errors.bannerDescription
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-400"
                }`}
            />
            {formik.touched.bannerDescription && formik.errors.bannerDescription && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.bannerDescription}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="bannerImage"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue("bannerImage", event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
              className="block w-full text-sm text-gray-600 
                         file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 
                         file:text-sm file:font-medium 
                         file:bg-indigo-50 file:text-indigo-600 
                         hover:file:bg-indigo-100"
            />
            {formik.touched.bannerImage && formik.errors.bannerImage && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.bannerImage}</p>
            )}

            {(formik.values.imageUrl || initialData?.imageUrl) && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                <img
                  src={formik.values.imageUrl || initialData?.imageUrl}
                  alt="Preview"
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
