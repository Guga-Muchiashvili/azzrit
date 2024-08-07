export interface IUser {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    password: string | Buffer;
    acceptedTables : string[]
}

