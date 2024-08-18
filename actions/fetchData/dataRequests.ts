"use server";
import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    return existingUser;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string | undefined) => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    return existingUser;
  } catch (error) {
    return null;
  }
};

export const getEveryUser = async () => {
  try {
    const users = await db.user.findMany();
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getTableByCreator = async (id: string | undefined) => {
  try {
    const existingTable = await db.table.findFirst({
      where: {
        creatorId: id,
      },
    });

    if (existingTable) return true;
    return false;
  } catch (error) {}
};

export const getTableById = async (id: string | undefined) => {
  try {
    const existingTable = await db.table.findUnique({
      where: {
        id: id,
      },
    });

    if (existingTable) return existingTable;
    return false;
  } catch (error) {}
};

export const getEveryTable = async () => {
  try {
    const Tables = await db.table.findMany();
    return Tables;
  } catch (error) {
    console.log(error);
  }
};

export const isUserPlaying = async (id: string): Promise<boolean> => {
  try {
    const table = await db.table.findFirst({
      where: {
        players: {
          contains: id,
        },
      },
    });

    return table !== null;
  } catch (error) {
    console.error("Error checking if user is playing:", error);
    return false;
  }
};

export const waitingPlayerList = async (tableId: string) => {
  try {
    const table = await db.table.findFirst({
      where: { id: tableId },
    });

    if (!table) return { error: "Table Not Found" };

    const waitingPlayers = JSON.parse(table.waitingPlayers);
    return waitingPlayers;
  } catch (error) {}
};
