import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { SearchContext } from "./_features/Search/context/SearchContext";
import { ShoppingCartContext } from "./_features/ShoppingStore/context/ShoppingCartContext";
import { LikeContext } from "./_features/WishList/context/LikeContext";
import { WishListContext } from "./_features/WishList/context/WishListContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShoppingCartContext>
        <SearchContext>
          <LikeContext>
            <WishListContext>
              <App />
            </WishListContext>
          </LikeContext>
        </SearchContext>
      </ShoppingCartContext>
    </BrowserRouter>
  </React.StrictMode>,
);
