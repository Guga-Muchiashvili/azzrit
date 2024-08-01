'use server'
import { getTableByCreator } from "@/actions/fetchData/dataRequests";
import { ITableSend } from "@/app/(protected)/components/CreateTableForm/TableFormComponent/tableFormType";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export const CreateTable = async (data: ITableSend) => {


  const existingTable = await getTableByCreator(data.creatorId);

  const isPlayerAlreadyInThisTable = await db.table.findMany({
    where: {
      players: {
        contains: data.creatorId, 
      },
    },
  });

  console.log(existingTable, isPlayerAlreadyInThisTable)

  if (existingTable || isPlayerAlreadyInThisTable.length ) {
    return { error: "You Are in another Table" };
  }

  try {
    const table = await db.table.create({
      data: {
        title: data.title,
        gameMode: data.gameMode,
        tableType: data.tableType,
        players: JSON.stringify([]), 
        waitingPlayers: JSON.stringify([]), 
        creatorId: data.creatorId,
        playerCount: data.playerCount,
        gameStarted: false, 
      },
    });

    await db.user.update({
      where: { id: data.creatorId },
      data: {
        tableId: table.id,
      },
    });

    pusherServer.trigger('mafia-city', 'tables', table)

    return { success: "Table created successfully" };
  } catch (error) {
    console.error("Failed to create table:", error);
    return { error: "Failed to create table" };
  }
};
