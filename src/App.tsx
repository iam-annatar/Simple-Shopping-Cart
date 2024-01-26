import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { About } from './pages/About';
import { Store } from './pages/Store';
import { Home } from './pages/Home';
import { ThemeProvider } from './context/ThemeProvider';
import { ShoppingCartContext } from './context/ShoppingCartContext';
import { Toaster } from 'sonner';
import { ProductPage } from './pages/ProductPage';
import { SearchContextProvider } from './context/SearchContext';

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
            </Routes>
          </div>
          <Toaster duration={1500} richColors closeButton />
        </SearchContextProvider>
      </ShoppingCartContext>
    </ThemeProvider>
  );
};

export default App;
