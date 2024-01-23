import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetClose, SheetContent } from './ui/sheet';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export const MobileMenu = () => {
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
