import { ReactNode, createContext, useState } from 'react';

type ShoppingCartContextProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  count: number;
};

type ShoppingContextType = {
  getItemsCount: (id: number) => number;
  increaseCount: (id: number) => void;
  decreaseCount: (id: number) => void;
  removeItem: (id: number) => void;
};

export const ShoppingContext = createContext({} as ShoppingContextType);

export const ShoppingCartContext = ({ children }: ShoppingCartContextProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  function getItemsCount(id: number) {
    return items.find((item) => item.id === id)?.count || 0;
  }
  function increaseCount(id: number) {
    setItems((currentItem) => {
      if (currentItem.find((item) => item.id === id) == null) {
        return [...currentItem, { id, count: 1 }];
      } else {
        return currentItem.map((item) => {
          if (item.id === id) {
            return { ...item, count: item.count + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCount(id: number) {
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
  }
  function removeItem(id: number) {
    setItems((currentItem) => {
      return currentItem.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingContext.Provider
      value={{ getItemsCount, increaseCount, decreaseCount, removeItem }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};
