import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/@/components/ui/sheet';
import { useShoppingContext } from '@/hooks/useShoppingContext';

type ShoppingCartProps = {
  isOpen: boolean;
};

export const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart } = useShoppingContext();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent>
        <SheetTitle>Cart</SheetTitle>
      </SheetContent>
    </Sheet>
  );
};
