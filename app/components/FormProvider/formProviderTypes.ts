import { ReactNode } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

export interface FormProviderPropTypes {
    children: ReactNode;
    methods: UseFormReturn<any>; 
    submit: SubmitHandler<any>; 
  }