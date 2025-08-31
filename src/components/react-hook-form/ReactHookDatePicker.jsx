import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const ReactHookDateInput = ({ name, label }) => {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col">
            {label && (
              <label className="mb-2 text-gray-700 font-medium">{label}</label>
            )}
            <input
              type="date"
              {...field}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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

export default ReactHookDateInput;
