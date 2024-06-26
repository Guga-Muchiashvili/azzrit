"use server";
import ISignUp from "@/app/signUp/SignUptype";
import bcrypt from "bcryptjs";
import { toast } from "sonner";
import { db } from "@/lib/db";
import { getUserByEmail } from "../fetchData/dataRequests";

export const SignUpUser = async (
  data: ISignUp
): Promise<
  | {
      error: string;
      success?: undefined;
      message?: undefined;
    }
  | {
      success: boolean;
      message: string;
      error?: undefined;
    }
> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const existingUser = await getUserByEmail(data.email);

  if (existingUser) {
    return {
      error: "User is Already registered",
    };
  }

  await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    message: "Account Creates",
  };
};
