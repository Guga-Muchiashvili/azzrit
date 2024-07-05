import { IResetPassword } from "@/app/reset/restPasswordFormTypes";
import { ObjectSchema } from "yup";

export interface IResetPasswordFormComponentProps {
    schema : ObjectSchema<IResetPassword>
}