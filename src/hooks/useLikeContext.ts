import { useContext } from "react";

import { LikeContext } from "@/context/LikeContext";

export const useLikeContext = () => {
  const context = useContext(LikeContext);

  if (context == null) {
    throw new Error("context must be used within LikeContextProvider");
  }

  return context;
};
