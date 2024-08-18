"use server";

import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { IUser } from "@/types/types";

export const confirmRequest = async ({
  id,
  tableId,
}: {
  id: string | undefined;
  tableId: string | undefined;
}) => {
  if (!id) return { error: "User ID is undefined" };
  if (!tableId) return { error: "Table ID is undefined" };

  const user = await db.user.findFirst({
    where: { id },
  });

  const table = await db.table.findFirst({
    where: { id: tableId },
  });

  if (!user) return { error: "User not found" };
  if (!table) return { error: "Table not found" };

  const waitingPlayers = table.waitingPlayers
    ? JSON.parse(table.waitingPlayers)
    : [];
  const updatedWaitingPlayers =
    waitingPlayers.filter((player: IUser) => player.id !== id) || [];

  const acceptedTables = user.acceptedTables
    ? JSON.parse(user.acceptedTables)
    : [];
  if (acceptedTables.includes(tableId)) {
    return { message: "User already in the table" };
  }

  acceptedTables.push(tableId);

  try {
    await db.table.update({
      where: { id: tableId },
      data: {
        waitingPlayers: JSON.stringify(updatedWaitingPlayers),
      },
    });

    await db.user.update({
      where: { id },
      data: {
        acceptedTables: JSON.stringify(acceptedTables),
      },
    });

    pusherServer.trigger("mafia-city", "requests", updatedWaitingPlayers);

    return { success: "User accepted" };
  } catch (error) {
    console.error("Error updating table or user:", error);
    return { error: "Failed to update table or user" };
  }
};
