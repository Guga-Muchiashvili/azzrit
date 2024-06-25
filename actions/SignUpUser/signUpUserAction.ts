'use server'
import ISignUp from "@/app/signUp/SignUptype";
import bcrypt from 'bcrypt'
import schema from '../../app/signUp/schema'
import { db } from "@/lib/db";

export const SignUpUser = async(data : ISignUp ) => {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const existingUser = await db.user.findUnique({
        where : {
            email: data.email
        }
    })

    if(existingUser) {
       return console.log('already is user')
    }

    await db.user.create({
        data : {
            username : data.username,
            email : data.email,
            password : hashedPassword,
        }
    })

}