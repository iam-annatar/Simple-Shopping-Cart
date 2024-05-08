import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useCallback, useMemo, useState } from "react";

import storeItems from "@/shared/data/item.json";

import useDebounce from "../hook/useDebounce";

type Filter = (typeof storeItems)[number];

interface SearchState {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  filterItems: () => Filter[];
}

export const Context = createContext({} as SearchState);

interface SearchContextProps {
  children: ReactNode;
}

export const SearchContext = ({ children }: SearchContextProps) => {
  const [searchValue, setSearchValue] = useState("");
  const debounceVal = useDebounce(searchValue, 600);

  const filterItems = useCallback(() => {
    return storeItems.filter((item) =>
      item.name.toLowerCase().includes(debounceVal.toLowerCase()),
    );
  }, [debounceVal]);

  const value = useMemo(() => {
    return { searchValue, setSearchValue, filterItems };
  }, [filterItems, searchValue]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
