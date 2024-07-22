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

export const getEveryUser = async() => {
    try {
        const Tables = await db.user.findMany()
        return Tables
    } catch (error) {
        console.log(error)
    }
}

export const getTableByCreator = async(id : string | undefined) => {
    console.log(id)
    try {
        const existingTable = await db.table.findFirst({
            where : {
                creatorId : id
            }
        })

        if(existingTable) return true
        return false
    } catch (error) {
        
    }
}

export const getTableById = async(id : string | undefined) => {
    try {
        const existingTable = await db.table.findFirst({
            where : {
                id : id
            }
        })

        if(existingTable) return true
        return false
    } catch (error) {
        
    }
}

export const getEveryTable = async() => {
    try {
        const Tables = await db.table.findMany()
        return Tables
    } catch (error) {
        console.log(error)
    }
}