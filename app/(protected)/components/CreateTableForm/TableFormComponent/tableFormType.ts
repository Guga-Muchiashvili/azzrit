import { IUser } from "@/types/types";

export interface ITableForm {
    title : string,
    private : any,
    classic : any
}

export type ITable = {
    id: string;
    creatorId: string;
    tableType: string; // 'public' or 'private'
    gameMode: string;  // 'classic' or 'sport'
    creator: IUser;     // Relation to User model
    waitingPlayers: TableRequest[]; 
    players: IUser[];   
  };

  export type TableRequest = {
    id: string;
    tableId: string;
    userId: string;
    status: string; 
    table: ITable;  
    user: IUser;     
  };