import { useContext } from "react";

import { Context } from "@/context/SearchContext";

export const useSearchContext = () => {
  const context = useContext(Context);

  if (context == null) {
    throw new Error("context must be used within SearchContextProvider");
  }

  return context;
};
