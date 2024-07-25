"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import { ITable } from "../CreateTableForm/TableFormComponent/tableFormType";
import { useSession } from "next-auth/react";
import { MdDelete } from "react-icons/md";
import noPfpImg from "../../../assets/no profile.jpg";
import { deleteTable } from "@/actions/GameLogics/DeleteTable/deleteTable";
import { useTypeContext } from "../../tableTypeContext/TypeContext";
import CreateTableModal from "../tableModalComponent/TableModal";
import CreateModal from "../tableModalComponent/TableModal";
import { useRouter } from "next/navigation";
import { appendPlayer } from "@/actions/GameLogics/appendPlayer/appendPlayer";
import { flushSync } from "react-dom";
import { deleteUserTableId } from "@/actions/GameLogics/deletePlayerFromTable/deletePlayer";
import { sendRequest } from "@/actions/GameLogics/sendRequest/sendRequest";

const TableCardElement = ({ item, index }: { item: ITable; index: number }) => {
  const session = useSession();
  const { users, toggleModal, modal } = useTypeContext();
  const navigate = useRouter();
  const [id, setId] = useState({ id: "", creatorId: "" });

  const DeleteTable = async () => {
    setId({ id: item.id, creatorId: item.creatorId });
    toggleModal();
  };


  const SendRequest = async () => {

    if(item.tableType == 'public' || item.creatorId === session.data?.user.id){
      const res = await appendPlayer(session.data?.user.id as string, item.id);
      if (res.tableId == item.id)
        return navigate.push(`/table/${item.id}`);
      if (res.success) return navigate.push(`/table/${item.id}`);
    }
    else{
      console.log('aqa')
      const res = await sendRequest({id : session.data?.user.id, itemId : item.id})
      console.log(res)
      if(res.sucess == 'Joined')  return navigate.push(`/table/${item.id}`);
    }
   
  };

 

  return (
    <>
      {modal && id.id && <CreateModal ides={id} type="REMOVE" />}
      <motion.div
        initial={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 1, delay: 0.1 * index }}
        className="w-full overflow-hidden relative h-72 bg-black bg-opacity-65 md:w-[550px] rounded-3xl px-4"
      >
        <div className="w-full h-1/3 flex items-start  py-5 gap-3 relative ">
          <motion.div
            initial={{ opacity: 0, translateX: -30 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <Image
              src={
                item?.creator?.image?.includes("http")
                  ? item.creator.image
                  : (noPfpImg.src as string)
              }
              alt="img"
              width={310}
              height={310}
              className="w-20 h-20 mb-2 rounded-full"
            ></Image>
          </motion.div>
          <div className="h-full gap-1 flex flex-col justify-start text-white py-1">
            <motion.h1
              initial={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="text-2xl font-bold hidden md:block"
            >
              {item.title}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="hidden md:block"
            >
              {item.creator?.name}
            </motion.h2>
          </div>
          <div className="absolute right-1 flex-col flex gap-3 items-end ">
            <motion.button
              initial={{ opacity: 0, translateX: 40 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className={`${
                item.gameStarted ? "bg-green-700" : "bg-gray-600"
              } cursor-default text-white px-4 py-1 rounded-full `}
            >
              {item.gameStarted ? "playing" : "Pending"}
            </motion.button>
            <motion.h1
              initial={{ opacity: 0, translateX: 40 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="text-white font-semibold mr-2 cursor-pointer"
            >
              {item.playerCount}/12
            </motion.h1>
          </div>
        </div>
        <div className="w-full h-2/5 mt-2 flex flex-wrap p-3 gap-5">
          {JSON.parse(item.players as any).map((player : string) =>
            users
              .filter((user) => user.id === player)
              .map((matchingUser, i) => (
                <motion.div initial={{opacity : 0, translateY : 10}} animate={{opacity : 1, translateY : 0}} transition={{duration : 2, delay : 0.5 * i, ease : 'easeIn'}} key={matchingUser.id}>
                  <Image alt="image" src={matchingUser.image as string} width={40} height={40} className="w-10 h-10 rounded-full" />
                </motion.div>
              ))
          )}
        </div>

        <div className="w-full absolute bottom-3 flex left-0 justify-between px-3 pl-5 items-center">
          {item.gameStarted ? (
            <motion.h1
              initial={{ opacity: 0, translateX: -30 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="text-white font-semibold flex items-center gap-2"
            >
              {" "}
              {item.gameMode} 3/5 <FaEye className="text-xl" />
            </motion.h1>
          ) : (
            <motion.h1
              initial={{ opacity: 0, translateX: -30 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="text-white font-semibold flex items-center gap-2"
            >
              {" "}
              {item.creatorId == session.data?.user.id && (
                <MdDelete
                  className="text-3xl text-red-500 cursor-pointer"
                  onClick={() => DeleteTable()}
                />
              )}
              {item.gameMode} / {item.tableType}
            </motion.h1>
          )}
          <motion.button
            initial={{ opacity: 0, translateX: 40 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className={`w-32 h-9 ${
              item.gameStarted ? "bg-gray-600" : "bg-green-600"
            } text-white rounded-full`}
            onClick={() => SendRequest()}
          >
            {item.gameStarted
              ? "Spectate"
              : item.creatorId == session?.data?.user.id
              ? "join"
              : "Request"}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default TableCardElement;
