"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { getTableById, getUserById } from "@/actions/fetchData/dataRequests";
import { ITable } from "../CreateTableForm/TableFormComponent/tableFormType";
import { useTypeContext } from "../../tableTypeContext/TypeContext";
import { IUser } from "@/types/types";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { deleteUserTableId } from "@/actions/GameLogics/deletePlayerFromTable/deletePlayer";
import { pusherClient } from "@/lib/pusher";
import CretorControlComponent from "../creatorControlComponent/CretorControl";
import { useRouter } from "next/navigation";
import { appendPlayer } from "@/actions/GameLogics/appendPlayer/appendPlayer";
import { sendRequest } from "@/actions/GameLogics/sendRequest/sendRequest";

const PlayerListComponent = () => {
  const [table, setTable] = useState<ITable | null>(null);
  const { tableId } = useParams();
  const { getTableUsers } = useTypeContext();
  const [players, setPlayers] = useState<IUser[]>([]);
  const { data: sessionData } = useSession();
  const navigate = useRouter();

  const fetchTableData = useCallback(
    async (id: string) => {
      try {
        const fetchedTable = await getTableById(id);
        if (fetchedTable) {
          setTable(fetchedTable as any);
          const fetchedPlayers = await getTableUsers(fetchedTable.id);
          setPlayers(fetchedPlayers as any);
        }
      } catch (error) {
        console.error("Error fetching table:", error);
      }
    },
    [getTableUsers]
  );

  useEffect(() => {
    if (!tableId) return;

    const CheckIsValid = async () => {
      const user = await getUserById(sessionData?.user.id);

      if (!user?.acceptedTables.includes(tableId as string)) {
        return navigate.push("/");
      } else {
        const res = await sendRequest({
          id: sessionData?.user.id,
          itemId: tableId as string,
        });
      }
    };

    CheckIsValid();

    fetchTableData(tableId as string);

    const channel = pusherClient.subscribe("mafia-city");

    const handleTableUpdate = async (data: any) => {
      if (data.id === tableId) {
        fetchTableData(tableId as string);
      }
    };

    channel.bind("tables", handleTableUpdate);

    return () => {
      channel.unbind("tables", handleTableUpdate);
      pusherClient.unsubscribe("mafia-city");
    };
  }, [sessionData?.user]);

  return (
    <div className="w-full h-screen">
      <CretorControlComponent creatorId={table?.creatorId} />
      <div className="w-full h-full flex flex-wrap p-20 gap-12">
        {players.length > 0 &&
          players.map((item) => (
            <div
              key={item.id}
              className="w-96 h-80 bg-gray-500 rounded-xl relative flex"
            >
              <div className="w-full h-14 flex gap-2 px-5 items-start py-3">
                <Image
                  src={item.image || ""}
                  width={1200}
                  height={1200}
                  alt="picture"
                  className="rounded-full h-12 w-12"
                />
                {table?.creatorId === sessionData?.user.id &&
                  sessionData?.user.id !== item.id && (
                    <FaTrash
                      className="text-red-500 absolute bottom-2 right-2 cursor-pointer"
                      onClick={() => deleteUserTableId(item.id, "kick")}
                    />
                  )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default React.memo(PlayerListComponent);
