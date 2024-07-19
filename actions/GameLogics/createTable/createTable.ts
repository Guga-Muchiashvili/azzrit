'use server'
import { getTableByCreator } from "@/actions/fetchData/dataRequests";
import { ITable, ITableForm } from "@/app/(protected)/components/CreateTableForm/TableFormComponent/tableFormType";
import IEditUser from "@/app/(protected)/editprofile/types"
import { db } from "@/lib/db"

export const CreateTable = async (data: ITable) => {

    const anotherTable = await getTableByCreator(data.creatorId);
    
  
    if (anotherTable) return { error: "You Have another table created" };
  
    // const updatedUser = await db.user.update({
    //   where: {
    //     email: data.email as string,
    //   },
    //   data: {
    //     image: data.image,
    //     name: data.name,
    //     email : data.email
    //   },
    // });
  
    // console.log('daje aqac var')
    // return { success: "user updated", user: updatedUser };
  };