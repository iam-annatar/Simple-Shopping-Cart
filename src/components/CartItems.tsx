import { Button } from '@/components/ui/button';
import storeItems from '@/data/item.json';
import { useShoppingContext } from '@/hooks/useShoppingContext';
import { formatCurrency } from '@/utilities/formattCurrency';

type CartItemsProps = {
  id: number;
  count: number;
};

export const CartItems = ({ id, count }: CartItemsProps) => {
  const { removeItem } = useShoppingContext();

  const item = storeItems.find((item) => item.id === id);

  return (
    <div className="grid grid-cols-2 place-items-center  gap-2 mt-4 border-b xs:flex xs:items-center ">
      <img
        src={item?.imgUrl}
        alt=""
        className="object-cover w-[128px] h-[75px] xs:mb-4"
      />
      <div className="me-auto">
        <div className="flex justify-center items-center">
          <div className="text-sm mb-1 ">
            {item?.name}{' '}
            {count > 1 && (
              <span className="text-xs text-gray-400">&times;{count}</span>
            )}
          </div>
        </div>
        <div className="text-center text-muted-foreground text-xs">
          {formatCurrency(item?.price || 0)}
        </div>
      </div>

      <div className="flex gap-10 col-[1/-1] row-[3/3] xs:flex items-center xs:gap-4 flex-row-reverse">
        <Button
          onClick={() => removeItem(id)}
          className="w-4 h-4 mb-2 bg-inherit  border border-red-500 rounded-full outline-red-500 text-red-500 hover:text-white hover:bg-red-500 "
        >
          &times;
        </Button>
        <div className="text-sm mb-2 text-muted-foreground">
          {formatCurrency((item?.price || 0) * count)}
        </div>
      </div>
    </div>
  );
};
