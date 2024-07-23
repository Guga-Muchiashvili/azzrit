'use client'
import { getEveryTable, getEveryUser } from '@/actions/fetchData/dataRequests';
import { filterTableLabels } from '@/app/additional/texts';
import { createContext, useContext, useState, ReactNode } from 'react';
import { ITable } from '../components/CreateTableForm/TableFormComponent/tableFormType';

const types = filterTableLabels;
type Type = typeof types[number] | null;

interface TypeContextProps {
  type: Type | null;
  defineType: (newType: Type) => void;
  Tables: ITable[] | null;
  fetchData: () => void;
  modal : boolean;
  toggleModal : () => void
}

const TypeContext = createContext<TypeContextProps>({
  type: 'table',
  defineType: () => {},
  Tables: null,
  fetchData: () => {},
  modal : false,
  toggleModal : () => {}
});

export const TypeProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<Type>(null);
  const [Tables, setTables] = useState<ITable[] | null>(null);
  const [modal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(prev => !prev)
  }

  const fetchData = async () => {
    try {
      const tables = await getEveryTable()
      const users = await getEveryUser()

      console.log('users', users, tables, 'tables')
      const enrichedTableData = tables?.map(table => {
        const creator = users?.find(user => user.id === table.creatorId)
        return {
          ...table,
          creator: creator || null
        }
      })

      console.log(enrichedTableData)

      setTables(enrichedTableData as any) 
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }


  const defineType = (newType: Type) => {
    if (types.includes(newType as string) || newType == null) {
      setType(newType);
    } else {
      console.error(`Invalid type: ${newType}`);
    }
  };

  return (
    <TypeContext.Provider value={{ type, Tables, toggleModal, modal, defineType, fetchData }}>
      {children}
    </TypeContext.Provider>
  );
};

export const useTypeContext = () => useContext(TypeContext);
