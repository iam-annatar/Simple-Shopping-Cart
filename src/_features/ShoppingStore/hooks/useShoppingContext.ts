import { useContext } from "react";

import { ShoppingContext } from "@/_features/ShoppingStore/context/ShoppingCartContext";

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);

  if (context === undefined) {
    throw new Error("context must be used within ShoppingCartContextProvider");
  }

  return context;
};
