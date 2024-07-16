'use client'
import { filterTableLabels } from '@/app/additional/texts';
import { createContext, useContext, useState, ReactNode } from 'react';

const types = filterTableLabels
type Type = typeof types[number] | null;

interface TypeContextProps {
  type: Type | null;
  defineType: (newType: Type ) => void;
}
const TypeContext = createContext<TypeContextProps>({
  type: 'table',
  defineType: () => {},
});

export const TypeProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<Type >(null);

  const defineType = (newType: Type ) => {
    if (types.includes(newType as string) || newType == null) {
      setType(newType);
    } else {
      console.error(`Invalid type: ${newType}`);
    }
  };

  return (
    <TypeContext.Provider value={{ type, defineType }}>
      {children}
    </TypeContext.Provider>
  );
};


export const useTypeContext = () => useContext(TypeContext);
