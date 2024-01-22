import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet';
import { useShoppingContext } from '@/hooks/useShoppingContext';
import { useTheme } from '@/hooks/useTheme';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const { cartCount, openCart } = useShoppingContext();

  return (
    <div className="container z-10 bg-white dark:bg-slate-950 mx-auto sticky top-0">
      <div className="py-3 bg-white dark:bg-slate-950 flex justify-between items-center border-b dark:border-b ">
        <div className="flex gap-x-2">
          <nav className="hidden sm:flex items-center gap-4  text-gray-400 hover:*:text-black dark:hover:*:text-white ">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/store">Store</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>
          <MobileMenu />
          <ToggleTheme />
        </div>

        <button
          onClick={openCart}
          className="relative rounded-full border-2 bg-white w-[3rem] h-[3rem] text-blue-500 hover:bg-blue-500 hover:text-white dark:bg-blue-500 dark:hover:bg-white dark:text-white dark:hover:text-blue-500 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="currentColor"
            className="w-6 h-6 mx-auto"
          >
            <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
          </svg>
          <div className="absolute bottom-0  right-[-4px] translate-y-[7px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </div>
        </button>
      </div>
    </div>
  );
};

const ToggleTheme = () => {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="sm:hidden"
        onClick={() => setIsOpen(true)}
        variant="ghost"
        size="icon"
      >
        <Menu className="h-[1.3rem] w-[1.3rem]" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <SheetContent
          className="w-full h-[10rem] dark:bg-slate-950"
          side={'left'}
        >
          <nav className="grid gap-5 place-items-center text-gray-400 hover:*:text-black dark:hover:*:text-white">
            <NavLink onClick={() => setIsOpen(false)} to="/">
              Home
            </NavLink>
            <NavLink onClick={() => setIsOpen(false)} to="/store">
              Store
            </NavLink>
            <NavLink onClick={() => setIsOpen(false)} to="/about">
              About
            </NavLink>
          </nav>
          <SheetClose className="absolute left-7 top-[25.7px] rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </>
  );
};
