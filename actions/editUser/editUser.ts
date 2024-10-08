"use server";
import IEditUser from "@/app/(protected)/editprofile/types";
import { getUserByEmail } from "../fetchData/dataRequests";
import { db } from "@/lib/db";
import { login } from "../SignInUser/SignIn";

export const updateUser = async (data: IEditUser) => {
  const CurrentUser = await getUserByEmail(data.email as string);

  if (!CurrentUser) return { error: "something went wrong" };

  const updatedUser = await db.user.update({
    where: {
      email: data.email as string,
    },
    data: {
      image: data.image,
      name: data.name,
      email: data.email,
    },
  });

  return { success: "user updated", user: updatedUser };
};
