import IEditUser from "@/app/(protected)/editprofile/types";
import ISignUp from "@/app/signUp/SignUptype";
import { ObjectSchema } from "yup";

export interface IEditUserProps {
    schema : ObjectSchema<IEditUser>,
    onLanding : boolean
}