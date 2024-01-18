import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: (() => T) | T
) => {
  const [value, setValue] = useState<T>(() => {
    const json = localStorage.getItem(key);

    if (json != null) return JSON.parse(json);

    if (typeof initialValue === 'function') {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
};
