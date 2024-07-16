"use client";
import TableProvider from "@/app/components/FormProvider/FormProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import schema from "./createTable.schema";
import { useTypeContext } from "@/app/(protected)/tableTypeContext/TypeContext";
import TextInputElement from "@/app/(protected)/elements/textInputElement/TextInputElement";

const TableFormComponent = () => {
  const { defineType, type } = useTypeContext();

  const defaultValues = {
    title: "",
    private: true,
    classic: true,
  };

  const method = useForm({
    resolver: yupResolver(schema),
  });

  console.log(method.formState.errors)

  const submit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="w-1/3 bg-black bg-opacity-55 border-2 border-red-500 px-4 h-80 rounded-xl relative overflow-hidden">
      <h2
        className="font-bold text-red-500  absolute top-3 right-3 cursor-pointer"
        onClick={() => defineType(null)}
      >
        X
      </h2>
      <TableProvider submit={method.handleSubmit(submit)} methods={method}>
        <TextInputElement name={'title'} placeholder={'Enter Title'} />
        <button className="w-full rounded-full text-white font-bold tracking-widest h-10 bg-red-500 left-0" type="submit">Create</button>
      </TableProvider>
    </div>
  );
};

export default TableFormComponent;
