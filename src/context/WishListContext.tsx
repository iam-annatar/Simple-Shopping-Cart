import type { ReactNode } from "react";
import { createContext, useMemo } from "react";

import allItems from "@/data/item.json";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type ItemInfo = (typeof allItems)[number];

interface WishListContextProps {
  children: ReactNode;
}

interface WishListState {
  wishList: ItemInfo[];
  addToWishList: (id: number) => void;
  removeFromWishList: (id: number) => void;
}

export const WishContext = createContext({} as WishListState);

export const WishListContextProvider = ({ children }: WishListContextProps) => {
  const [wishList, setWishList] = useLocalStorage<ItemInfo[]>("wishlist", []);

  const value = useMemo(() => {
    const addToWishList = (id: number) => {
      setWishList((prevItem) => {
        if (prevItem.find((itm) => itm.id === id)) {
          return prevItem;
        } else {
          const newItem = allItems.find((i) => i.id === id);

          if (newItem) {
            return [...prevItem, newItem];
          }
        }

        return prevItem;
      });
    };

    const removeFromWishList = (id: number) => {
      return setWishList((item) => item.filter((i) => i.id !== id));
    };

    return {
      wishList,
      addToWishList,
      removeFromWishList,
    };
  }, [wishList, setWishList]);

  return <WishContext.Provider value={value}>{children}</WishContext.Provider>;
};
