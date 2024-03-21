import { X } from "lucide-react";

import { useShoppingContext } from "@/_features/ShoppingStore/hooks/useShoppingContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import storeItems from "@/shared/data/item.json";
import { formatCurrency } from "@/shared/utils/formattCurrency";

import { CartItems } from "./CartItems";

interface ShoppingCartProps {
  isOpen: boolean;
}

export const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, items, cartCount } = useShoppingContext();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="overflow-y-scroll">
        <div className="flex items-center justify-between">
          <SheetTitle>Cart</SheetTitle>{" "}
          <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>
        {items.map((item) => (
          <CartItems key={item.id} {...item} />
        ))}
        {cartCount === 0 ? (
          <div className="mt-4 text-center text-xl">Your Cart is empty!</div>
        ) : (
          <div className="mt-4 text-right text-xl">
            Total :{" "}
            {formatCurrency(
              items.reduce((total, cartItem) => {
                const item = storeItems.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.count;
              }, 0),
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
