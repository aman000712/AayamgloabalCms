import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const ReactHookImageInput = ({
  name,
  label,
  imagePreview,
  setImagePreview,
}) => {
  const { control, setValue } = useFormContext();
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (5 MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5 MB. Please choose a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setValue("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="md:col-span-2">
      {label && (
        <label className="block text-gray-700 mb-2 font-medium">{label}</label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-red-500 transition"
            onClick={() => document.getElementById(`${name}-fileInput`).click()}
          >
            {imagePreview ? (
              <div className="text-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-48 h-32 object-cover rounded-lg mb-4 shadow-md mx-auto"
                />
                <p className="text-sm text-gray-600">Click to change image</p>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">Click to upload or drag & drop</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
              </div>
            )}

            <input
              id={`${name}-fileInput`}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default ReactHookImageInput;
