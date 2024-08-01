'use server'
import { db } from "@/lib/db";

export const deleteUserTableId = async (id: string, mode? : string) => {

  console.log(
    'aq var'
  )
    if (!id) {
      console.error("User ID is undefined");
      return;
    }
  
    try {

      const user = await db.user.findFirst({
        where : {id}
      })
    
      const tables = await db.table.findMany({
        where: {
          players: {
            contains: id,
          },
        },
      });
  
      console.log(`Found tables with user ${id}:`, tables);

      console.log('esari', user)
  
      for (const table of tables) {
        const playersArray = JSON.parse(table.players);
        const acceptedTables = JSON.parse(user?.acceptedTables as string)
        console.log(`Original players array for table ${table.id}:`, playersArray);
        console.log('accu', acceptedTables)
  
        const updatedAcceptedTables = acceptedTables?.filter((item : string) => item !== tables[0].id)
        const updatedPlayersArray = playersArray?.filter((playerId: string) => playerId !== id);
        console.log(`Updated players array for table ${table.id}:`, updatedPlayersArray);
  
        await db.table.update({
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
            acceptedTables : JSON.stringify(mode =='kick' ? updatedAcceptedTables : user?.acceptedTables)
          },
        });
  
        console.log(`Table ${table.id} updated with new players array and playerCount`);
        return userUpdate;

      }
      } catch (error) {
      console.log(error);
    }
  };
  