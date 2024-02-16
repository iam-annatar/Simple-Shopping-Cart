import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useMemo, useState } from "react";

import storeItems from "@/data/item.json";

type Filter = (typeof storeItems)[number];

interface SearchState {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  filterItems: (query: string) => Filter[];
}

export const Context = createContext({} as SearchState);

interface SearchContextProps {
  children: ReactNode;
}

export const SearchContextProvider = ({ children }: SearchContextProps) => {
  const [searchValue, setSearchValue] = useState("");

  const filterItems = (query: string) => {
    return storeItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const value = useMemo(() => {
    return { searchValue, setSearchValue, filterItems };
  }, [searchValue]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
