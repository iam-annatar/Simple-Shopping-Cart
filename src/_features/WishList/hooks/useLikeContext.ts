import { useContext } from "react";

import { Likectx } from "@/_features/WishList/context/LikeContext";

export const useLikeContext = () => {
  const context = useContext(Likectx);

  if (context == null) {
    throw new Error("context must be used within LikeContextProvider");
  }

  return context;
};
