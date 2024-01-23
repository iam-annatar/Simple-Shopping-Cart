import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

import storeItems from '@/data/item.json';

type Filter = (typeof storeItems)[number];

type SearchState = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  filterItems: (query: string) => Filter[];
};

export const Context = createContext({} as SearchState);

type SearchContextProps = {
  children: ReactNode;
};

export const SearchContextProvider = ({ children }: SearchContextProps) => {
  const [searchValue, setSearchValue] = useState('');

  const filterItems = (query: string) => {
    return storeItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <Context.Provider value={{ searchValue, setSearchValue, filterItems }}>
      {children}
    </Context.Provider>
  );
};
