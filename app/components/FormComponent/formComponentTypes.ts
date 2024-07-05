import { ISignIn } from "@/app/signIn/SignIntype";
import ISignUp from "@/app/signUp/SignUptype";
import { ObjectSchema } from "yup";

export interface IFormComponentProps {
    schema : ObjectSchema<ISignIn | ISignUp>
}