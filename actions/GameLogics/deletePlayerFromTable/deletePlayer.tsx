'use server'
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export const deleteUserTableId = async (id: string, mode?: string) => {
  console.log('aq var');
  
  if (!id) {
    console.error("User ID is undefined");
    return;
  }

  try {
    const user = await db.user.findFirst({
      where: { id }
    });

    if (!user) {
      console.error("User not found");
      return;
    }

    const tables = await db.table.findMany({
      where: {
        players: {
          contains: id,
        },
      },
    });

    console.log(`Found tables with user ${id}:`, tables);
    console.log('esari', user);

    for (const table of tables) {
      const playersArray = JSON.parse(table.players);
      const acceptedTables = JSON.parse(user.acceptedTables || '[]');
      console.log(`Original players array for table ${table.id}:`, playersArray);

      let updatedAcceptedTables = [];

      if (acceptedTables) {
        updatedAcceptedTables = acceptedTables.filter((item: string) => item !== table.id);
      }

      const updatedPlayersArray = playersArray.filter((playerId: string) => playerId !== id);
      console.log(`Updated players array for table ${table.id}:`, updatedPlayersArray);

     const updatedTable = await db.table.update({
        where: {
          id: table.id,
        },
        data: {
          players: JSON.stringify(updatedPlayersArray),
          playerCount: updatedPlayersArray.length,
        },
      });

      const userUpdate = await db.user.update({
        where: { id },
        data: {
          tableId: null,
          acceptedTables: mode == 'kick' ? JSON.stringify(updatedAcceptedTables) : user.acceptedTables,
        },
      });
      

      const tables = await db.table.findMany()

      pusherServer.trigger('mafia-city', 'tables', tables)

      console.log(`Table ${table.id} updated with new players array and playerCount`);
      return userUpdate;
    }
  } catch (error) {
    console.log(error);
  }
};
