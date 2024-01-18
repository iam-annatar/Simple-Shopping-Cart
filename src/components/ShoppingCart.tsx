import { Sheet, SheetContent, SheetTitle } from '@/@/components/ui/sheet';
import { useShoppingContext } from '@/hooks/useShoppingContext';
import { CartItems } from './CartItems';
import { formatCurrency } from '@/utilities/formattCurrency';
import storeItems from '@/data/item.json';

type ShoppingCartProps = {
  isOpen: boolean;
};

export const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, items } = useShoppingContext();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="overflow-y-scroll">
        <SheetTitle>Cart</SheetTitle>
        {items.map((item) => (
          <CartItems key={item.id} {...item} />
        ))}
        <div className="text-xl mt-4 text-right">
          Total :{' '}
          {formatCurrency(
            items.reduce((total, cartItem) => {
              const item = storeItems.find((item) => item.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.count;
            }, 0)
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
