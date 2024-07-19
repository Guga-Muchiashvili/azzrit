'use server'
import { db } from "@/lib/db"

export const getUserByEmail = async(email : string) => {
    try {
        const existingUser = await db.user.findUnique({
            where : {
                email
            }
        })

        return existingUser
    } catch (error) {
        return null
    }
   
}

export const getUserById = async(id : string | undefined) => {
    try {
        const existingUser = await db.user.findUnique({
            where : {
                id
            }
        })
        console.log('existing user', existingUser)

        return existingUser
    } catch (error) {
        return null
    }
   
}


export const getTableByCreator = async(id : string | undefined) => {
    try {
        const existingTable = await db.table.findUnique({
            where : {
                creatorId : id
            }
        })
        if(existingTable) return existingTable
        return false
    } catch (error) {
        
    }
}