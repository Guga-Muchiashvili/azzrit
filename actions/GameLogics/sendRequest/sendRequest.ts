'use server'
import { db } from "@/lib/db"
import { IUser } from "@/types/types"
import { appendPlayer } from "../appendPlayer/appendPlayer"

export const sendRequest = async({id, itemId} : {id : string | undefined, itemId: string}) => {
    const existtingTable = await db.table.findFirst({
        where : {
            id : itemId
        }
    })

    if(!existtingTable) return {error : "Table Not found"}

    const user = await db.user.findFirst({
        where : {id}
    })

    const table = await db.table.findFirst({
        where : {id : itemId}
    })


    if(table?.creatorId == id) return {sucess : "Joined"}

    if(JSON.parse(user?.acceptedTables as string).includes(itemId)) {
        const res = await appendPlayer(id as string, itemId)
        return {sucess : "Joined", tableId : res.tableId}
    }

    const isSame = JSON.parse(table?.waitingPlayers as string).map((item : IUser) => {
        console.log('dd', item, id)
        if(item.id == id ) {
            return true
        }
        return false
        })

        if(isSame.includes(true)) return {message : "Already Sent"}

    const waitingPlayers = [...JSON.parse(table?.waitingPlayers as string), user]

    console.log(waitingPlayers, 'ssss')

    await db.table.update({
        where : {
            id : itemId
        },
        data : {
            waitingPlayers : JSON.stringify(waitingPlayers[0] == false ? null : waitingPlayers)
        }
    })

    return {sucess : "Waiting Players Sent"}
}