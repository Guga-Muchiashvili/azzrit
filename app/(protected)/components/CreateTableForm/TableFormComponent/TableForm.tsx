"use client";
import TableProvider from "@/app/components/FormProvider/FormProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import schema from "./createTable.schema";
import { useTypeContext } from "@/app/(protected)/tableTypeContext/TypeContext";
import TextInputElement from "@/app/(protected)/elements/textInputElement/TextInputElement";
import RadioInputElement from "@/app/(protected)/elements/checkBoxElement/CheckBoxElement";
import { useSession } from "next-auth/react";
import { ITableForm, ITableSend } from "./tableFormType";
import { User } from "next-auth";
import { IUser } from "@/types/types";
import { CreateTable } from "@/actions/GameLogics/createTable/createTable";
import { toast } from "sonner";
const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const TableFormComponent = () => {
  const session = useSession();
  const [error, setError] = useState("");
  const { defineType, type, fetchData } = useTypeContext();

  const defaultValues = {
    title: `${session.data?.user.name}s Table`,
    private: "",
    classic: "",
  };

  const method = useForm<ITableForm>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const submit = async (e: ITableForm) => {
    if (session.data?.user) {
      const data: ITableSend = {
        gameStarted: false,
        playerCount: 0,
        title: e.title,
        creatorId: session.data?.user.id as string,
        gameMode: e.classic == "true" ? "classic" : "sport",
        players: [],
        tableType: e.private == "true" ? "private" : "public",
        waitingPlayers: [],
      };

      const res = await CreateTable(data);

      if (res.error) return setError(res.error);
      defineType(null);
      fetchData();
    }
  };

  return (
    <div className="w-3/4 lg:w-1/4 bg-black bg-opacity-55 border-2 border-red-500 px-4 h-80 rounded-xl fixed overflow-hidden">
      <h2
        className="font-bold text-red-500 absolute top-3 right-3 cursor-pointer"
        onClick={() => defineType(null)}
      >
        X
      </h2>
      <TableProvider submit={method.handleSubmit(submit)} methods={method}>
        <TextInputElement name={"title"} placeholder={"Enter Title"} />
        <div className="flex w-full h-12 justify-center gap-[2px]">
          <RadioInputElement label={"Public"} name={"private"} value={false} />
          <RadioInputElement label={"Private"} name={"private"} value={true} />
        </div>
        <div className="flex w-full h-12 justify-center gap-[2px]">
          <RadioInputElement label={"classic"} name={"classic"} value={true} />
          <RadioInputElement label={"Sport"} name={"classic"} value={false} />
        </div>
        {error && (
          <div className="w-full h-11 bg-red-600 text-sm 0 rounded-xl text-white text-center font-bold flex items-center justify-center">
            {error}
          </div>
        )}
        <button
          className="w-full hover:scale-90 duration-500 rounded-md mt-3 text-white font-bold tracking-widest h-10 bg-green-500 left-0"
          type="submit"
        >
          Create
        </button>
      </TableProvider>
    </div>
  );
};

export default TableFormComponent;
