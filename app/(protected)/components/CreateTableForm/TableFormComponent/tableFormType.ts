import { IUser } from "@/types/types";

export interface ITableForm {
    title : string,
    private : any,
    classic : any
}

export type ITableSend = {
    title : string
    creatorId: string ;
    tableType: string; 
    gameMode: string;  
    waitingPlayers: TableRequest[]; 
    players: IUser[];  
    gameStared : boolean,
    playerCount : number 
  };

  export interface ITable {
    creator : IUser,
    creatorId : string,
    gameMode : string,
    id : string,
    tableType : string,
    title : string,
    playerCount : number,
    gameStarted : boolean
  }

  export type TableRequest = {
    id: string;
    tableId: string;
    userId: string;
    status: string; 
    table: ITableSend;  
    user: IUser;     
  };