import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { SearchContext } from "./_features/Search/context/SearchContext";
import { ShoppingCartContext } from "./_features/ShoppingStore";
import { LikeContext, WishListContext } from "./_features/WishList";
import App from "./App";
import { ThemeProvider } from "./shared/context/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="Theme">
        <ShoppingCartContext>
          <SearchContext>
            <LikeContext>
              <WishListContext>
                <App />
              </WishListContext>
            </LikeContext>
          </SearchContext>
        </ShoppingCartContext>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
