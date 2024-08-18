import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const PasswordToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return PasswordToken;
  } catch (error) {
    console.log(error);
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const PasswordToken = await db.passwordResetToken.findFirst({
      where: { email },
    });
    return PasswordToken;
  } catch (error) {
    console.log(error);
  }
};
