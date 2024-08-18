"use server";
import { db } from "@/lib/db";
import { IUser } from "@/types/types";
import { appendPlayer } from "../appendPlayer/appendPlayer";
import { pusherServer } from "@/lib/pusher";

export const sendRequest = async ({
  id,
  itemId,
}: {
  id: string | undefined;
  itemId: string;
}) => {
  const existingTable = await db.table.findFirst({
    where: {
      id: itemId,
    },
  });

  if (!existingTable) return { error: "Table Not found" };

  const user = await db.user.findFirst({
    where: { id },
  });

  if (!user) return { error: "User Not found" };

  const table = await db.table.findFirst({
    where: { id: itemId },
  });

  if (!table) return { error: "Table Not found" };

  if (table.creatorId === id) return { success: "Joined" };

  const acceptedTables = JSON.parse(user.acceptedTables as string);

  if (acceptedTables.includes(itemId)) {
    const res = await appendPlayer(id as string, itemId);
    return { success: "Joined", tableId: res.tableId };
  }

  const waitingPlayers = JSON.parse(table.waitingPlayers as string) || [];

  const isSame = waitingPlayers.some((player: IUser) => player.id === id);

  if (isSame) return { message: "Already Sent" };

  waitingPlayers.push(user);

  await db.table.update({
    where: {
      id: itemId,
    },
    data: {
      waitingPlayers: JSON.stringify(waitingPlayers),
    },
  });

  const tables = await db.table.findMany();

  console.log("updated", tables);
  pusherServer.trigger("mafia-city", "tables", tables);
  pusherServer.trigger("mafia-city", "requests", waitingPlayers);

  return { success: "Waiting Players Sent" };
};
