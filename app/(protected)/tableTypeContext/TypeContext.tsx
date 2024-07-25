'use client'
import { getEveryTable, getEveryUser, getUserById } from '@/actions/fetchData/dataRequests';
import { filterTableLabels } from '@/app/additional/texts';
import { createContext, useContext, useState, ReactNode } from 'react';
import { ITable } from '../components/CreateTableForm/TableFormComponent/tableFormType';
import { IUser } from '@/types/types';

const types = filterTableLabels;
type Type = typeof types[number] | null;

interface TypeContextProps {
  type: Type | null;
  defineType: (newType: Type) => void;
  Tables: ITable[] | null;
  fetchData: () => void;
  modal : boolean;
  toggleModal : () => void,
  users : IUser[] | [],
  getTableUsers : (tableId : string) => void
}

const TypeContext = createContext<TypeContextProps>({
  type: 'table',
  defineType: () => {},
  Tables: null,
  fetchData: () => {},
  modal : false,
  toggleModal : () => {},
  users : [],
  getTableUsers : () => {}
});

export const TypeProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<Type>(null);
  const [Tables, setTables] = useState<ITable[] | null>(null);
  const [modal, setShowModal] = useState(false)
  const [users, setUsers] = useState<IUser[] | []>([])

  const toggleModal = () => {
    setShowModal(prev => !prev)
  }

  const fetchData = async () => {
    try {
      const tables = await getEveryTable()
      const users = await getEveryUser()

      const enrichedTableData = tables?.map(table => {
        const creator = users?.find(user => user.id === table.creatorId)
        return {
          ...table,
          creator: creator || null
        }
      })

      setUsers(users as any)
      setTables(enrichedTableData as any) 
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }


  const getTableUsers = async (tableId: string) => {
    try {
      const tables = await getEveryTable();
      // Find the table with the matching ID
      const table = tables?.find((item) => item.id === tableId);
      
      if (table) {

        const playersJson = table.players || '[]'; 
        const players = JSON.parse(playersJson);
        const userPromises = players.map((id : string) => getUserById(id));
        const users = await Promise.all(userPromises);
        
        users.forEach((user: any) => console.log(user));
        return users;
      } else {
        console.error('Table not found');
        return [];
      }
    } catch (error) {
      console.error('Failed to get table users:', error);
      return [];
    }
  };
  
  

  const defineType = (newType: Type) => {
    if (types.includes(newType as string) || newType == null) {
      setType(newType);
    } else {
      console.error(`Invalid type: ${newType}`);
    }
  };

  return (
    <TypeContext.Provider value={{ type, Tables, toggleModal, getTableUsers, modal, users, defineType, fetchData }}>
      {children}
    </TypeContext.Provider>
  );
};

export const useTypeContext = () => useContext(TypeContext);
