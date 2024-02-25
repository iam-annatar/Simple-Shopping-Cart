import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";

import { ShoppingCart } from "@/components/ShoppingCart";
import allItems from "@/data/item.json";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface ShoppingCartContextProps {
  children: ReactNode;
}

type ItemType = (typeof allItems)[number];

interface CartItem {
  id: number;
  count: number;
}

interface ShoppingContextType {
  getItemsCount: (id: number) => number;
  increaseCount: (id: number, count?: number) => void;
  decreaseCount: (id: number) => void;
  removeItem: (id: number) => void;
  items: CartItem[];
  cartCount: number;
  openCart: () => void;
  closeCart: () => void;
  rateCount: number;
  rateHandler: (value: number) => void;
  isLoading: boolean;
  liked: boolean;
  likesCount: number;
  toggleLike: () => void;
  likedItem: (id: number) => ItemType[];
}

export const ShoppingContext = createContext({} as ShoppingContextType);

export const ShoppingCartContext = ({ children }: ShoppingCartContextProps) => {
  const [items, setItems] = useLocalStorage<CartItem[]>("ShoppingInfo", []);

  const [isOpen, setIsOpen] = useState(false);
  const [rateCount, setRateCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    if (!liked) {
      setLikesCount((c) => c + 1);
      setLiked(true);
    } else {
      setLikesCount((c) => c - 1);
      setLiked(false);
    }
  };

  const likedItem = (id: number) => {
    return allItems.filter((item) => item.id === id);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  const rateHandler = (value: number) => {
    setRateCount(value);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartCount = items.reduce((count, item) => count + item.count, 0);

  const getItemsCount = (id: number) => {
    return items.find((item) => item.id === id)?.count || 0;
  };

  const increaseCount = (id: number, count: number = 1) => {
    setItems((currentItem) => {
      if (currentItem.find((item) => item.id === id) == null) {
        return [...currentItem, { id, count }];
      } else {
        return currentItem.map((item) => {
          if (item.id === id) {
            return { ...item, count: item.count + count };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCount = (id: number) => {
    setItems((currentItem) => {
      if (currentItem.find((item) => item.id === id)?.count === 1) {
        return currentItem.filter((item) => item.id !== id);
      } else {
        return currentItem.map((item) => {
          if (item.id === id) {
            return { ...item, count: item.count - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeItem = (id: number) => {
    setItems((currentItem) => {
      return currentItem.filter((item) => item.id !== id);
    });
  };

  return (
    <ShoppingContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        getItemsCount,
        increaseCount,
        decreaseCount,
        removeItem,
        cartCount,
        openCart,
        closeCart,
        items,
        rateCount,
        rateHandler,
        isLoading,
        liked,
        likesCount,
        toggleLike,
        likedItem,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingContext.Provider>
  );
};
