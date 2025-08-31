import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const AddTeamMember = ({
    onClose,
    onSave,
    onCancel,
    initialData = null,
    isEditing = false,
}) => {
    const accentColor = "rgb(191,23,23)";

    const formik = useFormik({
        initialValues: {
            name: initialData?.name || "",
            designation: initialData?.designation || "",
            profilePicture: initialData?.profilePicture || null,
            bio: initialData?.bio || "",
            linkedin: initialData?.linkedin || "",
            twitter: initialData?.twitter || "",
            facebook: initialData?.facebook || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            designation: Yup.string().required("Designation is required"),
            profilePicture: Yup.mixed().required("Profile picture is required"),
            bio: Yup.string().required("Bio is required").max(200, "Max 200 chars"),
            linkedin: Yup.string().url("Enter a valid LinkedIn URL"),
            twitter: Yup.string().url("Enter a valid Twitter URL"),
            facebook: Yup.string().url("Enter a valid Facebook URL"),
        }),
        onSubmit: async (values) => {
            let imageBase64 = values.profilePicture;
            if (values.profilePicture instanceof File) {
                imageBase64 = await fileToBase64(values.profilePicture);
            }
            onSave({ ...values, profilePicture: imageBase64 });
        },
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-xl shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4 text-[rgb(191,23,23)] text-center">
                    {isEditing ? "Edit Team Member" : "Add Team Member"}
                </h2>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            placeholder="Enter name"
                            className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched.name && formik.errors.name
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-red-600"
                                }`}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Designation <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="designation"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.designation}
                            placeholder="Enter designation"
                            className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched.designation && formik.errors.designation
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-red-600"
                                }`}
                        />
                        {formik.touched.designation && formik.errors.designation && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.designation}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bio <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="bio"
                            rows={3}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.bio}
                            placeholder="Enter a brief bio or description"
                            className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched.bio && formik.errors.bio
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-red-600"
                                }`}
                        />
                        {formik.touched.bio && formik.errors.bio && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.bio}</p>
                        )}
                    </div>

                    {["linkedin", "twitter", "facebook"].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                {field}
                            </label>
                            <input
                                type="url"
                                name={field}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values[field]}
                                placeholder={`https://${field}.com/username`}
                                className={`w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${formik.touched[field] && formik.errors[field]
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-red-600"
                                    }`}
                            />
                            {formik.touched[field] && formik.errors[field] && (
                                <p className="text-red-500 text-xs mt-1">
                                    {formik.errors[field]}
                                </p>
                            )}
                        </div>
                    ))}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            name="profilePicture"
                            accept="image/*"
                            onChange={(event) =>
                                formik.setFieldValue("profilePicture", event.currentTarget.files[0])
                            }
                            className="block w-full text-sm text-gray-600 
                file:mr-4 file:py-2 file:px-4 file:rounded-lg 
                file:border-0 file:text-sm file:font-medium 
                file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                        />
                        {(formik.values.profilePicture || initialData?.profilePicture) && (
                            <div className="mt-4 flex justify-center">
                                <div className="h-24 w-24 rounded-full overflow-hidden border flex items-center justify-center">
                                    <img
                                        src={
                                            formik.values.profilePicture instanceof File
                                                ? URL.createObjectURL(formik.values.profilePicture)
                                                : formik.values.profilePicture || initialData?.profilePicture
                                        }
                                        alt="Profile Preview"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onCancel || onClose}
                            className="w-1/3 py-2.5 rounded-lg bg-gray-300 text-gray-700 text-sm font-medium shadow-md hover:opacity-90 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-2/3 py-2.5 rounded-lg text-white text-sm font-medium shadow-md transition hover:opacity-90"
                            style={{ backgroundColor: accentColor }}
                        >
                            {isEditing ? "Update Team Member" : "Save Team Member"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTeamMember;
