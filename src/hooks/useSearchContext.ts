import { Context } from '@/context/SearchContext';
import { useContext } from 'react';

export const useSearchContext = () => {
  const context = useContext(Context);

  if (context == null) {
    throw new Error('context must be used within SearchContextProvider');
  }

  return context;
};
