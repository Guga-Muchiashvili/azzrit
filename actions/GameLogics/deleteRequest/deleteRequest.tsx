'use server'

import { db } from "@/lib/db"
import { pusherServer } from "@/lib/pusher"
import { IUser } from "@/types/types"

export const rejectRequest = async({id, tableId } : {id : string | undefined, tableId : string | undefined}) => {

    const user = await db.user.findFirst({
        where : {id}
    })

    if(!user) return {message :"User Not found"}

    const table = await db.table.findFirst({
        where : {id : tableId}
    })

    if(!user) return {error : "User Not Found"}

    const waitingPlayerList = [...JSON.parse(table?.waitingPlayers as string).filter((item : IUser ) => item.id !== id)]

    console.log('waitingaa', waitingPlayerList)


    if(JSON.parse(user.acceptedTables).includes(tableId)){
        return {message : "Already In"}
    }


    const tableUpd = await db.table.update({
        where : {id : tableId},
        data : {
            waitingPlayers : JSON.stringify(waitingPlayerList as any)
        }
    })

    pusherServer.trigger('mafia-city', 'requests', waitingPlayerList);


    return {sucess : "User Rejected"}
}