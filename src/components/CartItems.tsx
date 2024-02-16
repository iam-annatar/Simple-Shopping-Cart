import { Button } from "@/components/ui/button";
import storeItems from "@/data/item.json";
import { useShoppingContext } from "@/hooks/useShoppingContext";
import { formatCurrency } from "@/utilities/formattCurrency";

interface CartItemsProps {
  id: number;
  count: number;
}

export const CartItems = ({ id, count }: CartItemsProps) => {
  const { removeItem } = useShoppingContext();

  const items = storeItems.find((item) => item.id === id);

  return (
    <div className="mt-4 grid grid-cols-2  place-items-center gap-2 border-b xs:flex xs:items-center ">
      <img
        src={items?.imgUrl}
        alt=""
        className="h-[75px] w-[128px] object-cover xs:mb-4"
      />
      <div className="me-auto">
        <div className="flex items-center justify-center">
          <div className="mb-1 text-sm ">
            {items?.name}{" "}
            {count > 1 && (
              <span className="text-xs text-gray-400">&times;{count}</span>
            )}
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground">
          {formatCurrency(items?.price || 0)}
        </div>
      </div>

      <div className="col-[1/-1] row-[3/3] flex flex-row-reverse items-center gap-[5rem] xs:flex xs:gap-4">
        <Button
          onClick={() => removeItem(id)}
          className="mb-2 size-4 rounded-full border  border-red-500 bg-inherit text-red-500 outline-red-500 hover:bg-red-500 hover:text-white "
        >
          &times;
        </Button>
        <div className="mb-2 text-sm text-muted-foreground">
          {formatCurrency((items?.price || 0) * count)}
        </div>
      </div>
    </div>
  );
};
