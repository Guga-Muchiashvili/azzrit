'use server'
import { getTableByCreator, getTableById } from "@/actions/fetchData/dataRequests";
import { ITableSend } from "@/app/(protected)/components/CreateTableForm/TableFormComponent/tableFormType";
import { db } from "@/lib/db";

export const deleteTable = async (id: string, creatorId : string) => {
  const existingTable = await getTableById(id);

  console.log(existingTable, id)

  
  if (!existingTable) {
    return { error: "No Table Found" };
  }

  try {
    const table = await db.table.delete({
      where : {
        id : id
      }
    });

    const user = await db.user.update({
      where: { id: creatorId },
      data: {
        tableId : undefined
      },
    });

    return { success: "Table created successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create table" };
  }
};
