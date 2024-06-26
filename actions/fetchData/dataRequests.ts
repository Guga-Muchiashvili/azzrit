import { db } from "@/lib/db"

export const getUserByEmail = async(email : string) => {
    try {
        const existingUser = await db.user.findUnique({
            where : {
                email
            }
        })
        console.log('existing user', existingUser)

        return existingUser
    } catch (error) {
        return null
    }
   
}

export const getUserById = async(id : string) => {
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
