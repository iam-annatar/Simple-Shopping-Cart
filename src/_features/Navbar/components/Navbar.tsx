import { NavLink, useLocation } from "react-router-dom";

import { Search } from "@/_features/Search/components/SearchBar";
import { useShoppingContext } from "@/_features/ShoppingStore/hooks/useShoppingContext";
import { ToggleTheme } from "@/shared/components/ToggleTheme";

import { MobileMenu } from "./MobileMenu";

export const Navbar = () => {
  const { cartCount, openCart } = useShoppingContext();

  const location = useLocation();

  const pages = {
    home: "/home",
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
          className="relative size-[3rem] rounded-full border-2 bg-white  hover:bg-blue-400 hover:text-white dark:bg-blue-400   dark:hover:bg-white "
        >
          <img
            className="mx-auto size-6 "
            src="/icons/shoppingIcon.svg"
            alt="shop"
          />
          <div className="absolute bottom-0  right-[-4px] flex size-5 translate-y-[7px] items-center justify-center rounded-full bg-red-500 text-white">
            {cartCount}
          </div>
        </button>
      </div>
    </div>
  );
};
