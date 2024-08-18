import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RadioInputElementProps } from "./radioInputElementTypes";
import "./styles.scss";

const RadioInputElement = ({ name, value, label }: RadioInputElementProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="w-1/2 h-full flex relative flex-col">
          <div className="flex relative">
            <input
              type="radio"
              value={String(value)}
              checked={field.value === String(value)}
              onChange={field.onChange}
              className="radio-input h-full"
            />
            <p className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-gray-200 pointer-events-none">
              {label}
            </p>
          </div>
          {error && (
            <span className="text-red-500 text-sm mt-1">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default RadioInputElement;
