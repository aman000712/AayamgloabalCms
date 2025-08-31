import React from "react";
import { TextInput } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "../../lib/utils";

const ReactHookTextInput = ({
  name,
  label,
  inputClassName,
  onInputChange,
  variant,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col">
          {label && (
            <label className="mb-2 text-gray-700 font-medium">{label}</label>
          )}

          <TextInput
            {...field}
            variant={variant}
            error={error?.message}
            onChange={(e) => {
              field.onChange(e.target.value);
              onInputChange?.();
            }}
            classNames={{
              label: "text-gray-500 mb-1",
              error: "text-sm text-red-500 mt-1",
              input: cn(
                "w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                variant === "unstyled" && "focus:border-none",
                inputClassName
              ),
            }}
            {...rest}
          />
        </div>
      )}
    />
  );
};

export default ReactHookTextInput;
