import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddBlogValidationSchema from "../../../validations/AddBlogValidation";
import ReactHookTextInput from "../../react-hook-form/ReactHookTextInput";
import ReactHookTextArea from "../../react-hook-form/ReactHookTextArea";
import ReactHookSelectInput from "../../react-hook-form/ReactHookSelectInput";
import ReactHookDateInput from "../../react-hook-form/ReactHookDatePicker";
import ReactHookImageInput from "../../react-hook-form/ImageUploader";
import { Button } from "@mantine/core";

const AddBlog = ({ onAdd, onCancel }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const defaultValues = {
    title: "",
    content: "",
    except: "",
    category: "",
    author: "",
    date: "",
    image: null,
  };

  const methods = useForm({
    resolver: yupResolver(AddBlogValidationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const categories = JSON.parse(localStorage.getItem("categories")) || [
    "Kitchen Arts",
    "Field Visit",
    "Housekeeping",
    "General Accounting",
  ];

  const handleImageChange = (file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be <2MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setValue("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const saveBlog = (values) => {
    const newBlog = {
      ...values,
      image:
        values.image || "https://via.placeholder.com/150x150.png?text=Blog",
    };
    onAdd?.(newBlog);
    reset();
    setImagePreview(null);
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg max-w-6xl mx-auto transition-all duration-300">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center md:text-left">
        Add New Blog
      </h2>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(saveBlog)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <ReactHookTextInput
            errors={errors}
            name="title"
            label="Title"
            placeholder="Enter Title"
          />
          <ReactHookSelectInput
            name="category"
            label="Category"
            options={categories}
          />
          <ReactHookTextInput
            errors={errors}
            name="author"
            label="Author"
            placeholder="Enter Author"
          />
          <ReactHookDateInput name="date" label="Date" />
          <ReactHookTextArea
            errors={errors}
            name="except"
            label="Excerpt"
            placeholder="Brief description..."
          />
          <ReactHookTextArea
            errors={errors}
            name="content"
            label="Content"
            placeholder="Full content..."
          />
          <ReactHookImageInput
            name="image"
            label="Blog Image"
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            handleImageChange={(e) => handleImageChange(e.target.files[0])}
          />
          <div className="md:col-span-2 flex justify-end gap-6 mt-6">
            <Button
              label="Cancel"
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 shadow"
            />

            <Button
              type="submit"
              label="Add Blog"
              disabled={isSubmitting}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow"
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddBlog;
