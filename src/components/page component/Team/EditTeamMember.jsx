import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Helper to convert File to Base64
const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const EditTeamMember = ({ member, onClose, onSave }) => {
    const formik = useFormik({
        initialValues: { ...member },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            designation: Yup.string().required("Designation is required"),
            profilePicture: Yup.mixed().required("Profile picture is required"),
            bio: Yup.string().required("Bio is required").max(200, "Max 200 chars"),
            linkedin: Yup.string().url("Invalid URL"),
            twitter: Yup.string().url("Invalid URL"),
            facebook: Yup.string().url("Invalid URL"),
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
            <div className="bg-white p-5 rounded-xl shadow-lg w-full max-w-sm relative overflow-auto">
                <h2 className="text-lg font-semibold mb-4 text-[rgb(191,23,23)] text-center">
                    Edit Team Member
                </h2>
                <form onSubmit={formik.handleSubmit} className="space-y-2">
                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[rgb(191,23,23)]"
                    />

                    {/* Designation */}
                    <input
                        type="text"
                        name="designation"
                        placeholder="Designation"
                        value={formik.values.designation}
                        onChange={formik.handleChange}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[rgb(191,23,23)]"
                    />

                    {/* Profile Picture */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700 text-sm">Profile Picture</label>
                        <label
                            htmlFor="profilePicture"
                            className="cursor-pointer bg-[rgb(191,23,23)] text-white px-3 py-1 rounded hover:bg-red-800 w-max text-center text-sm transition"
                        >
                            Choose File
                        </label>
                        <input
                            id="profilePicture"
                            type="file"
                            name="profilePicture"
                            onChange={(e) =>
                                formik.setFieldValue("profilePicture", e.currentTarget.files[0])
                            }
                            className="hidden"
                        />
                        {formik.values.profilePicture && (
                            <img
                                src={
                                    typeof formik.values.profilePicture === "string"
                                        ? formik.values.profilePicture
                                        : URL.createObjectURL(formik.values.profilePicture)
                                }
                                alt="Preview"
                                className="mt-2 w-20 h-20 object-cover rounded-full border self-center"
                            />
                        )}
                        {formik.touched.profilePicture && formik.errors.profilePicture && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.profilePicture}</p>
                        )}
                    </div>

                    {/* Short Bio */}
                    <textarea
                        name="bio"
                        placeholder="Short Bio"
                        value={formik.values.bio}
                        onChange={formik.handleChange}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[rgb(191,23,23)]"
                        rows="2"
                    />

                    {/* Social Links */}
                    <input
                        type="url"
                        name="linkedin"
                        placeholder="LinkedIn URL"
                        value={formik.values.linkedin}
                        onChange={formik.handleChange}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[rgb(191,23,23)] text-sm"
                    />
                    <input
                        type="url"
                        name="twitter"
                        placeholder="Twitter URL"
                        value={formik.values.twitter}
                        onChange={formik.handleChange}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[rgb(191,23,23)] text-sm"
                    />
                    <input
                        type="url"
                        name="facebook"
                        placeholder="Facebook URL"
                        value={formik.values.facebook}
                        onChange={formik.handleChange}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[rgb(191,23,23)] text-sm"
                    />

                    {/* Buttons */}
                    <div className="flex justify-end space-x-2 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100 text-sm transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-1 bg-[rgb(191,23,23)] text-white rounded hover:bg-red-800 text-sm transition"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTeamMember;
