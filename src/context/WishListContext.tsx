import type { ReactNode } from "react";
import { createContext, useCallback, useMemo, useState } from "react";

import allItems from "@/data/item.json";

type ItemInfo = (typeof allItems)[number];

interface WishListContextProps {
  children: ReactNode;
}

interface WishListState {
  wishList: ItemInfo[];
  addToWishList: (id: number) => void;
  liked: boolean;
  likesCount: number;
  toggleLike: () => void;
}

export const WishContext = createContext({} as WishListState);

export const WishListContextProvider = ({ children }: WishListContextProps) => {
  const [wishList, setWishList] = useState<ItemInfo[]>([]);

  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const toggleLike = useCallback(() => {
    if (!liked) {
      setLikesCount((c) => c + 1);
      setLiked(true);
    } else {
      setLikesCount((c) => c - 1);
      setLiked(false);
    }
  }, [liked]);

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

  const value = useMemo(() => {
    return { wishList, addToWishList, liked, likesCount, toggleLike };
  }, [wishList, liked, likesCount, toggleLike]);
  return <WishContext.Provider value={value}>{children}</WishContext.Provider>;
};
