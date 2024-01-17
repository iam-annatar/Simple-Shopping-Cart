import { ShoppingContext } from '@/context/ShoppingCartContext';
import { useContext } from 'react';

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);

  if (context === undefined) {
    throw new Error('context must be used within ShoppingCartContextProvider');
  }

  return context;
};
