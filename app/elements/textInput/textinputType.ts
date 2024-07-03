import IEditUser from "@/app/(protected)/editprofile/types";
import { ISignIn } from "@/app/signIn/SignIntype";
import ISignUp from "@/app/signUp/SignUptype";
import { FieldErrors } from "react-hook-form";

export interface ITextInputProps {
    id : string,
    placeholder : string ,
    type : string,
    label : string, 
    control : any
    error : FieldErrors<ISignIn | ISignUp | IEditUser>,
    disabled : boolean
}