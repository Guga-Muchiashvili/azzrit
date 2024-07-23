'use server'
import { db } from "@/lib/db";

export const appendPlayer = async (id: string, tableId: string) => {
  try {

    const table = await db.table.findUnique({
      where: { id: tableId },
    });

    if (!table) {
      return { error: "Table not found" };
    }

    const isPlayerAlreadyInThisTable = await db.table.findMany({
      where: {
        players: {
          contains: id, 
        },
      },
    });

    console.log('isPlaying', isPlayerAlreadyInThisTable)
    

    if(isPlayerAlreadyInThisTable.length) return {status : 'Joined', tableId : isPlayerAlreadyInThisTable[0].id}

    const players = JSON.parse(table.players);
    players.push(id); 

    const updatedPlayers = JSON.stringify(players);

    const updatedTable = await db.table.update({
      where: { id: tableId },
      data: {
        players: updatedPlayers,
        playerCount: {
          increment: 1,
        },
      },
    });

    const updateUser = await db.user.update({
      where : {
        id
      },
      data : {
          tableId
      }
    })

    return { success: "Player added successfully", table: updatedTable };
  } catch (error) {
    console.error("Error updating table:", error);
    return { error: "Failed to update table" };
  }
};
