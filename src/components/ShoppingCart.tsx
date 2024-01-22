import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';
import { useShoppingContext } from '@/hooks/useShoppingContext';
import { CartItems } from './CartItems';
import { formatCurrency } from '@/utilities/formattCurrency';
import storeItems from '@/data/item.json';
import { X } from 'lucide-react';

type ShoppingCartProps = {
  isOpen: boolean;
};

export const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, items, cartCount } = useShoppingContext();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="overflow-y-scroll">
        <div className="flex items-center justify-between">
          <SheetTitle>Cart</SheetTitle>{' '}
          <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>
        {items.map((item) => (
          <CartItems key={item.id} {...item} />
        ))}
        {cartCount === 0 ? (
          <div className="text-xl mt-4 text-center">Your Cart is empty!</div>
        ) : (
          <div className="text-xl mt-4 text-right">
            Total :{' '}
            {formatCurrency(
              items.reduce((total, cartItem) => {
                const item = storeItems.find((item) => item.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.count;
              }, 0)
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
