import React from "react";
import { Textarea } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "../../lib/utils";

const ReactHookTextArea = ({
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
          <Textarea
            {...field}
            variant={variant}
            error={error?.message}
            onChange={(e) => {
              field.onChange(e.target.value);
              onInputChange?.();
            }}
            classNames={{
              input: cn(
                "w-full px-6 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 transition-all",
                "!h-[120px] md:!text-[16px] !text-[14px] !font-poppins",
                variant === "unstyled" && "focus:border-none",
                inputClassName
              ),
              label: "hidden",
              error: "text-red-500 text-sm mt-1",
            }}
            {...rest}
          />
        </div>
      )}
    />
  );
};

export default ReactHookTextArea;
