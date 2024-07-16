import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { FormProviderPropTypes } from "./formProviderTypes";

const TableProvider = ({
  children,
  methods,
  submit,
}: FormProviderPropTypes) => {
  return (
    <FormProvider {...methods}>
      <form className="flex flex-col justify-between h-full items-stretch py-5" onSubmit={submit}>{children}</form>
    </FormProvider>
  );
};

export default TableProvider;
