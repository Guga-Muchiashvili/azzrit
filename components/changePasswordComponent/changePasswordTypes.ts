import { ObjectSchema } from "yup"

export interface IChangePassword{ 
    password : string,
    confirmPassword : string
}

export interface IChangePasswordComponentProps{
    schema : ObjectSchema<IChangePassword>
}