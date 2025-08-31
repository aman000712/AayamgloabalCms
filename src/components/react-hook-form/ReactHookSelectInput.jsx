import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "../../lib/utils";

const ReactHookSelectInput = ({
  name,
  label,
  options = [], // array of strings or objects
  inputClassName,
  onChangeCallback,
  ...rest
}) => {
  const { control } = useFormContext();

  // convert string array to {value,label} format
  const formattedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col">
          {label && (
            <label className="mb-2 text-gray-700 font-medium">{label}</label>
          )}
          <select
            {...field}
            onChange={(e) => {
              field.onChange(e.target.value);
              onChangeCallback?.(e.target.value);
            }}
            className={cn(
              "w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
              inputClassName
            )}
            {...rest}
          >
            <option value="">Select an option</option>
            {formattedOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {error && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default ReactHookSelectInput;
