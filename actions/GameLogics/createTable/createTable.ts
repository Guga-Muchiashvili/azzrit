'use server'
import { getTableByCreator } from "@/actions/fetchData/dataRequests";
import { ITableSend } from "@/app/(protected)/components/CreateTableForm/TableFormComponent/tableFormType";
import { db } from "@/lib/db";

export const CreateTable = async (data: ITableSend) => {


  const existingTable = await getTableByCreator(data.creatorId);

  if (existingTable) {
    return { error: "You already have another table created" };
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

    return { success: "Table created successfully" };
  } catch (error) {
    console.error("Failed to create table:", error);
    return { error: "Failed to create table" };
  }
};
