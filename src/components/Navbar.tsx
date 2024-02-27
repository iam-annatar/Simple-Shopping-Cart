import { NavLink, useLocation } from "react-router-dom";

import { useShoppingContext } from "@/hooks/useShoppingContext";

import { MobileMenu } from "./MobileMenu";
import { Search } from "./SearchBar";
import { ToggleTheme } from "./ToggleTheme";

export const Navbar = () => {
  const { cartCount, openCart } = useShoppingContext();

  const location = useLocation();

  const pages = {
    home: "/",
    store: "/store",
    wishlist: "/wishlist",
    about: "/about",
  };

  return (
    <div className="container sticky top-0 z-10 bg-white dark:bg-slate-950">
      <div className="flex items-center justify-between border-b bg-white py-3 dark:border-b dark:bg-slate-950 ">
        <div className="flex items-center gap-x-2">
          <nav className="hidden items-center gap-8 text-gray-400  hover:*:text-black dark:hover:*:text-white sm:flex ">
            <NavLink to={pages.home}>Home</NavLink>
            <NavLink to={pages.store}>Store</NavLink>
            <NavLink to={pages.wishlist}>WishList</NavLink>
            <NavLink to={pages.about}>About</NavLink>
          </nav>
          <div className="flex gap-x-2">
            <MobileMenu />
            <ToggleTheme />
          </div>
          {location.pathname === pages.store && <Search />}
        </div>
        <button
          onClick={openCart}
          className="relative size-[3rem] rounded-full border-2 bg-white text-blue-500 hover:bg-blue-500 hover:text-white dark:bg-blue-500 dark:text-white dark:hover:bg-white dark:hover:text-blue-500 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="currentColor"
            className="mx-auto size-6"
          >
            <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
          </svg>
          <div className="absolute bottom-0  right-[-4px] flex size-5 translate-y-[7px] items-center justify-center rounded-full bg-red-500 text-white">
            {cartCount}
          </div>
        </button>
      </div>
    </div>
  );
};
