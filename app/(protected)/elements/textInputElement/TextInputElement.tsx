import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const TextInputElement = ({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <input
            className="outline-none bg-transparent text-white placeholder:text-red-400 h-12 border-b-2 border-b-red-500  p-1"
            onChange={field.onChange}
            value={field.value || ""}
            placeholder={placeholder}
            type={"text"}
          />
          {error && (
            <span className="text-red-500 text-sm mt-1">{error.message}</span>
          )}
        </>
      )}
    />
  );
};

export default TextInputElement;
