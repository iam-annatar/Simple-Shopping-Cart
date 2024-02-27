import { useContext } from "react";

import { WishContext } from "@/context/WishListContext";

export const useWishListContext = () => {
  const context = useContext(WishContext);

  if (context == null) {
    throw new Error("context must used within WishListContextProvider ");
  }

  return context;
};
