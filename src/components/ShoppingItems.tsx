import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useShoppingContext } from "@/hooks/useShoppingContext";
import { formatCurrency } from "@/utilities/formattCurrency";

import { StoreLazyLoading } from "./StoreLazyLoading";

interface ShoppingItemsProps {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
}

export const ShoppingItems = ({
  id,
  imgUrl,
  price,
  name,
}: ShoppingItemsProps) => {
  const { getItemsCount, increaseCount, decreaseCount, removeItem, isLoading } =
    useShoppingContext();
  const count = getItemsCount(id);

  if (isLoading) {
    return <StoreLazyLoading />;
  }

  return (
    <Card className="h-[21.5rem] shadow-md dark:bg-slate-900 ">
      <Link to={`/store/${id}`}>
        <img
          src={imgUrl}
          className="h-[200px] w-full rounded-t-sm object-cover"
          alt=""
        />
      </Link>
      <CardContent>
        <Link to={`/store/${id}`}>
          <div className="mt-4 flex cursor-pointer items-center justify-between align-baseline">
            <span className=" text-lg font-medium">{name}</span>{" "}
            <span className="text-gray-400">{formatCurrency(price)}</span>
          </div>
        </Link>
      </CardContent>
      <CardFooter>
        {count === 0 ? (
          <Button
            onClick={() => {
              toast.success(`Item "${name}" added to your cart`);
              increaseCount(id);
            }}
            className="w-full bg-blue-600 hover:bg-blue-600/90 dark:text-white"
          >
            + Add To Cart
          </Button>
        ) : (
          <div className="mx-auto grid grid-cols-1 grid-rows-2 place-items-center gap-2">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => {
                  if (count === 1) {
                    toast.warning(`Item "${name}" removed from your cart`);
                  }
                  decreaseCount(id);
                }}
                className="h-7 w-3 rounded-sm bg-blue-600 hover:bg-blue-600/90 dark:text-white "
              >
                -
              </Button>
              <div>
                <span className="text-lg">{count}</span> in cart
              </div>
              <Button
                size="sm"
                onClick={() => increaseCount(id)}
                className="h-7 w-3 rounded-sm bg-blue-600  hover:bg-blue-600/90 dark:text-white"
              >
                +
              </Button>
            </div>
            <Button
              onClick={() => {
                toast.warning(`Item "${name}" removed from your cart`);
                removeItem(id);
              }}
              className="h-7 w-16 rounded-sm bg-red-600 hover:bg-red-600/90 dark:text-white"
            >
              Remove
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
