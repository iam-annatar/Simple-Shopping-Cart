import { ShoppingCart } from '@/components/ShoppingCart';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ReactNode, createContext, useEffect, useState } from 'react';

type ShoppingCartContextProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  count: number;
};

type ShoppingContextType = {
  getItemsCount: (id: number) => number;
  increaseCount: (id: number, count?: number) => void;
  decreaseCount: (id: number) => void;
  removeItem: (id: number) => void;
  items: CartItem[];
  cartCount: number;
  openCart: () => void;
  closeCart: () => void;
  toggleLike: () => void;
  liked: boolean;
  likesCount: number;
  rateCount: number;
  rateHandler: (value: number) => void;
  isLoading: boolean;
};

export const ShoppingContext = createContext({} as ShoppingContextType);

export const ShoppingCartContext = ({ children }: ShoppingCartContextProps) => {
  const [items, setItems] = useLocalStorage<CartItem[]>('ShoppingInfo', []);

  const [isOpen, setIsOpen] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [rateCount, setRateCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  const toggleLike = () => {
    if (!liked) {
      setLikesCount((c) => c + 1);
      setLiked(true);
    } else {
      setLikesCount((c) => c - 1);
      setLiked(false);
    }
  };

  const cartCount = items.reduce((count, item) => count + item.count, 0);

  function getItemsCount(id: number) {
    return items.find((item) => item.id === id)?.count || 0;
  }
  function increaseCount(id: number, count: number = 1) {
    setItems((currentItem) => {
      if (currentItem.find((item) => item.id === id) == null) {
        return [...currentItem, { id, count: count }];
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
      value={{
        getItemsCount,
        increaseCount,
        decreaseCount,
        removeItem,
        cartCount,
        openCart,
        closeCart,
        items,
        liked,
        likesCount,
        toggleLike,
        rateCount,
        rateHandler,
        isLoading,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingContext.Provider>
  );
};
