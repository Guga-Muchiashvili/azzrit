import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const TextInputElement = ({ id, placeholder, type, label, control } : any) => {
  return (
    <Controller
      control={control}
      name={id}
      render={({ field, fieldState }) => (
        <TextField
          id={id}
          margin="normal"
          onChange={field.onChange}
          value={field.value}
          placeholder={placeholder}
          fullWidth
          type={type}
          variant="standard"
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : null}
        />
      )}
    />
  );
};

export default TextInputElement;
