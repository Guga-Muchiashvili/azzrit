'use server'
import IEditUser from "@/app/(protected)/editprofile/types"
import { getUserByEmail } from "../fetchData/dataRequests"
import { db } from "@/lib/db"
import { login } from "../SignInUser/SignIn"

export const updateUser = async (data: FormData) => {
  const email = data.get('email') as string;
  const image = data.get('image') as File
  console.log(image)
  console.log(image, 'edit')
    const CurrentUser = await getUserByEmail(email as string);
    console.log(CurrentUser)
  
    if (!CurrentUser) return { error: "something went wrong" };
  
    const updatedUser = await db.user.update({
      where: {
        email: data.email,
      },
      data: {
        image: data.image,
        name: data.name,
      },
    });
  
    return { success: "user updated", user: updatedUser };
  };