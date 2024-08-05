"use client";
import React, { useEffect, useState } from "react";
import CretorControlComponent from "../creatorControlComponent/CretorControl";
import { useParams } from "next/navigation";
import { getTableById } from "@/actions/fetchData/dataRequests";
import { ITable } from "../CreateTableForm/TableFormComponent/tableFormType";
import { useTypeContext } from "../../tableTypeContext/TypeContext";
import { IUser } from "@/types/types";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { deleteUserTableId } from "@/actions/GameLogics/deletePlayerFromTable/deletePlayer";
import { pusherClient } from "@/lib/pusher";

const PlayerListComponent = () => {
  const [table, setTable] = useState<ITable | null>(null);
  const { tableId } = useParams();
  const { getTableUsers } = useTypeContext();
  const [players, setPlayers] = useState<IUser[]>([]);
  const {data} = useSession()
  const [requests, setRequests] = useState([])

  useEffect(() => {
    pusherClient.subscribe('mafia-city')
    const getTable = async () => {
      const fetchedTable = await getTableById(tableId as string);
      if (fetchedTable) {
        setTable(fetchedTable as any);
        if ((fetchedTable as any).id) {
          const fetchedPlayers = await getTableUsers((fetchedTable as any).id);
          setPlayers(fetchedPlayers as any)
          // pusherClient.bind('requests', (data : any) => {
          //   console.log('datuna', data)
          //   setPlayers([...fetchedPlayers as any, data])
          // })
          
        }
      }
    };
    getTable();
    
  }, [tableId, getTableUsers]);

  console.log(players)
  
  
  return (
    <div className="w-full h-screen">
      <CretorControlComponent creatorId={table?.creatorId}  />
      <div className="w-full h-full flex flex-wrap p-20 gap-12">
      {players.map((item) => (
        <div key={item.id} className="w-96 h-80 bg-gray-500 rounded-xl relative flex">
            <div className="w-full h-14 flex gap-2 px-5 items-start py-3">
            <Image src={item.image as string || ''} width={1200} height={1200} alt="picture" className="rounded-full h-12 w-12" />
            {table?.creatorId === data?.user.id && <><FaTrash className="text-red-500 absolute bottom-2 right-2" onClick={() => deleteUserTableId(item.id, 'kick')}/></>}

            </div>

        </div>
      ))}
      </div>
    </div>
  );
};

export default PlayerListComponent;
