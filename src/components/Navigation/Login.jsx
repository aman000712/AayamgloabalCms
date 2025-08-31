import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(4, "Too short").required("Password is required"),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        console.log("Login Data:", values);
        setSubmitting(false);
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white rounded-md shadow-md w-full max-w-sm p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
                >
                    ×
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-sm text-red-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-sm text-red-600"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-red-600 text-white py-2 rounded hover:bg-red-700"
                            >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
