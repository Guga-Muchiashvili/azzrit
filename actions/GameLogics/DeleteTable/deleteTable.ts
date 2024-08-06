'use server'
import { getTableByCreator, getTableById } from "@/actions/fetchData/dataRequests";
import { ITableSend } from "@/app/(protected)/components/CreateTableForm/TableFormComponent/tableFormType";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export const deleteTable = async (id: string, creatorId: string) => {
  // Fetch the existing table
  const existingTable = await getTableById(id);

  if (!existingTable) {
    return { error: "No Table Found" };
  }

  try {
    const players = JSON.parse(existingTable.players || '[]') as string[];

    await Promise.all(
      players.map(playerId =>
        db.user.update({
          where: { id: playerId },
          data: { tableId: null },
        })
      )
    );

    await db.table.delete({
      where: {
        id: id
      }
    });

    await db.user.update({
      where: { id: creatorId },
      data: {
        tableId: null
      },
    });

    const tables = await db.table.findMany()

    pusherServer.trigger('mafia-city', 'tables', tables)



    return { success: "Table deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete table" };
  }
};
