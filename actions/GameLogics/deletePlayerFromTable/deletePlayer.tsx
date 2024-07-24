'use server'
import { db } from "@/lib/db";

export const deleteUserTableId = async (id: string) => {
    if (!id) {
      console.error("User ID is undefined");
      return;
    }
  
    try {
      // Update the user's tableId to null
      const userUpdate = await db.user.update({
        where: { id },
        data: {
          tableId: null,
        },
      });
  
      console.log(`User ${id} tableId set to null`, userUpdate);
  
      // Fetch all tables that have the user ID in the players array
      const tables = await db.table.findMany({
        where: {
          players: {
            contains: id,
          },
        },
      });
  
      console.log(`Found tables with user ${id}:`, tables);
  
      for (const table of tables) {
        const playersArray = JSON.parse(table.players);
        console.log(`Original players array for table ${table.id}:`, playersArray);
  
        const updatedPlayersArray = playersArray.filter((playerId: string) => playerId !== id);
        console.log(`Updated players array for table ${table.id}:`, updatedPlayersArray);
  
        await db.table.update({
          where: {
            id: table.id,
          },
          data: {
            players: JSON.stringify(updatedPlayersArray),
            playerCount: updatedPlayersArray.length
          },
        });
  
        console.log(`Table ${table.id} updated with new players array and playerCount`);
      }
  
      return userUpdate;
    } catch (error) {
      console.log(error);
    }
  };
  