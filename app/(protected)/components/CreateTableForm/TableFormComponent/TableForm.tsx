"use client";
import TableProvider from "@/app/components/FormProvider/FormProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import schema from "./createTable.schema";
import { useTypeContext } from "@/app/(protected)/tableTypeContext/TypeContext";
import TextInputElement from "@/app/(protected)/elements/textInputElement/TextInputElement";
import RadioInputElement from "@/app/(protected)/elements/checkBoxElement/CheckBoxElement";
import { useSession } from "next-auth/react";
import { ITableForm } from "./tableFormType";

const TableFormComponent = () => {

    const session = useSession()
  const { defineType, type } = useTypeContext();

  const defaultValues = {
    title: `${session.data?.user.name}s Table`,
    private: '',
    classic: '',
  };

  const method = useForm<ITableForm>({
    resolver: yupResolver(schema),
    defaultValues
  });


  const submit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="w-1/4 bg-black bg-opacity-55 border-2 border-red-500 px-4 h-80 rounded-xl relative overflow-hidden">
      <h2
        className="font-bold text-red-500  absolute top-3 right-3 cursor-pointer"
        onClick={() => defineType(null)}
      >
        X
      </h2>
      <TableProvider submit={method.handleSubmit(submit)} methods={method}>
        <TextInputElement name={'title'} placeholder={'Enter Title'} />
        <div className="flex  w-full h-12  justify-center gap-[2px]">
        <RadioInputElement  label={'Public'} name={'private'} value={false} />
        <RadioInputElement label={'Private'} name={'private'} value={true} />
        </div>
        <div className="flex  w-full h-12  justify-center gap-[2px]">
        <RadioInputElement label={'classic'} name={'classic'} value={true} />
        <RadioInputElement label={'Sport'} name={'classic'} value={false} />
        </div>
        <button className="w-full rounded-md text-white font-bold tracking-widest h-10 bg-red-500 left-0" type="submit">Create</button>
      </TableProvider>
    </div>
  );
};

export default TableFormComponent;
