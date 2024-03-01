import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import { Navbar } from "./components/Navbar";
import { LikeContextProvider } from "./context/LikeContext";
import { SearchContextProvider } from "./context/SearchContext";
import { ShoppingCartContext } from "./context/ShoppingCartContext";
import { ThemeProvider } from "./context/ThemeProvider";
import { WishListContextProvider } from "./context/WishListContext";
import { About } from "./pages/AboutPage";
import { Home } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { Store } from "./pages/StorePage";
import { WhishListPage } from "./pages/WishListPage";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="Theme">
      <ShoppingCartContext>
        <SearchContextProvider>
          <LikeContextProvider>
            <WishListContextProvider>
              <Navbar />
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/store" element={<Store />} />
                  <Route path="/store/:productId" element={<ProductPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/wishlist" element={<WhishListPage />} />
                </Routes>
              </div>
              <Toaster duration={2000} richColors closeButton />
            </WishListContextProvider>
          </LikeContextProvider>
        </SearchContextProvider>
      </ShoppingCartContext>
    </ThemeProvider>
  );
};

export default App;
