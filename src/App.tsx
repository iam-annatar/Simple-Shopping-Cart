import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import { Navbar } from "./components/Navbar";
import { SearchContextProvider } from "./context/SearchContext";
import { ShoppingCartContext } from "./context/ShoppingCartContext";
import { ThemeProvider } from "./context/ThemeProvider";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { ProductPage } from "./pages/ProductPage";
import { Store } from "./pages/Store";
import { WhishList } from "./pages/Wishlist";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="Theme">
      <ShoppingCartContext>
        <SearchContextProvider>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/store/:productId" element={<ProductPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/wishlist" element={<WhishList />} />
            </Routes>
          </div>
          <Toaster duration={1500} richColors closeButton />
        </SearchContextProvider>
      </ShoppingCartContext>
    </ThemeProvider>
  );
};

export default App;
