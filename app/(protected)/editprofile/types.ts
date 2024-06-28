export default interface IEditUser {
    name : string | null | undefined,
    email : string | null | undefined,
    image : string | null | undefined
}

export interface ISessionData {
    expires : String,
    user : IEditUser & {id : string}
}