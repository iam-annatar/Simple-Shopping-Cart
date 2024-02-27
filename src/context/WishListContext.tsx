import type { ReactNode } from "react";
import { createContext, useCallback, useMemo, useState } from "react";

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
  liked: ItemInfo["liked"];
  toggleLike: () => void;
}

export const WishContext = createContext({} as WishListState);

export const WishListContextProvider = ({ children }: WishListContextProps) => {
  const [wishList, setWishList] = useLocalStorage<ItemInfo[]>("wishlist", []);
  const [liked, setLiked] = useState<ItemInfo["liked"]>(false);

  const toggleLike = useCallback(() => {
    if (!liked) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [liked]);

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
      setWishList((item) => item.filter((i) => i.id !== id));
    };

    return {
      wishList,
      addToWishList,
      liked,
      toggleLike,
      removeFromWishList,
    };
  }, [wishList, liked, toggleLike, setWishList]);

  return <WishContext.Provider value={value}>{children}</WishContext.Provider>;
};
