'use server'
import { getTableByCreator } from "@/actions/fetchData/dataRequests";
import { ITableSend } from "@/app/(protected)/components/CreateTableForm/TableFormComponent/tableFormType";
import { db } from "@/lib/db";

export const CreateTable = async (data: ITableSend) => {
  // Check if the creator already has a table
  const existingTable = await getTableByCreator(data.creatorId);

  console.log(existingTable)
  
  if (existingTable == true) {
    return { error: "You already have another table created" };
  }


  console.log('here')
  try {
    const table = await db.table.create({
      data: {
        title: data.title,
        gameMode: data.gameMode,
        tableType: data.tableType,
        players: {
          connect: data.players.map(playerId => ({ id: playerId })),
        },
        waitingPlayers: {
          connect: data.waitingPlayers.map(requestId => ({ id: requestId })),
        },
        creatorId : data.creatorId,
        playerCount : data.playerCount,
        gameStarted : data.gameStared
      },
    });

    const user = await db.user.update({
      where: { id: data.creatorId },
      data: {
        tableId : table.id
      },
    });

    console.log(user);
    return { success: "Table created successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create table" };
  }
};
