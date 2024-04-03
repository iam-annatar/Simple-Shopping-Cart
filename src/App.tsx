import "./styles/index.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import { About } from "./_features/About/page/AboutPage";
import { Home } from "./_features/Home/page/HomePage";
import { Navbar } from "./_features/Navbar/components/Navbar";
import { ProductPage } from "./_features/Product/page/ProductPage";
import { SearchContext } from "./_features/Search/context/SearchContext";
import { ShoppingCartContext } from "./_features/ShoppingStore/context/ShoppingCartContext";
import { Store } from "./_features/ShoppingStore/page/StorePage";
import { LikeContext } from "./_features/WishList/context/LikeContext";
import { WishListContext } from "./_features/WishList/context/WishListContext";
import { WishListPage } from "./_features/WishList/page/WishListPage";
import { ThemeProvider } from "./shared/context/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="Theme">
      <ShoppingCartContext>
        <SearchContext>
          <LikeContext>
            <WishListContext>
              <Navbar />
              <div className="container">
                <Routes>
                  <Route path="/">
                    <Route index element={<Navigate to="/store" replace />} />
                  </Route>
                  <Route path="/home" element={<Home />} />
                  <Route path="/store" element={<Store />} />
                  <Route path="/store/:productId" element={<ProductPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/wishlist" element={<WishListPage />} />
                </Routes>
              </div>
              <Toaster duration={2000} richColors closeButton />
            </WishListContext>
          </LikeContext>
        </SearchContext>
      </ShoppingCartContext>
    </ThemeProvider>
  );
};

export default App;
