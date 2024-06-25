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