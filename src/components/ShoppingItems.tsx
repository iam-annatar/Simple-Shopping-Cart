import { Button } from '@/@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/@/components/ui/card';
import { useShoppingContext } from '@/hooks/useShoppingContext';
import { formatCurrency } from '@/utilities/formattCurrency';

type ShoppingItemsProps = {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
};

export const ShoppingItems = ({
  id,
  imgUrl,
  price,
  name,
}: ShoppingItemsProps) => {
  const { getItemsCount, increaseCount, decreaseCount, removeItem } =
    useShoppingContext();

  const count = getItemsCount(id);

  return (
    <Card className=" mb-4 shadow-md dark:bg-slate-900">
      <img
        src={imgUrl}
        className="object-cover w-full h-[200px] rounded-t-sm"
        alt=""
      />
      <CardContent>
        <div className="flex justify-between items-center mt-4">
          <div className="text-lg">{name}</div>{' '}
          <span className="text-gray-400">{formatCurrency(price)}</span>
        </div>
      </CardContent>
      <CardFooter>
        {count === 0 ? (
          <Button
            onClick={() => increaseCount(id)}
            className="w-full bg-blue-600 hover:bg-blue-600/90 dark:text-white"
          >
            + Add To Cart
          </Button>
        ) : (
          <div className="grid grid-cols-1 grid-rows-2 place-items-center mx-auto gap-2">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => decreaseCount(id)}
                className="bg-blue-600 hover:bg-blue-600/90 p-[12px] h-[1.7rem] rounded-sm dark:text-white "
              >
                -
              </Button>
              <div className="">
                <div className="text-lg">
                  {count} <span>in cart</span>
                </div>
              </div>
              <Button
                onClick={() => increaseCount(id)}
                className="bg-blue-600 hover:bg-blue-600/90 p-2 h-[1.7rem] rounded-sm dark:text-white"
              >
                +
              </Button>
            </div>
            <Button
              onClick={() => removeItem(id)}
              className="bg-red-600 hover:bg-red-600/90 w-16 h-7 rounded-sm dark:text-white"
            >
              Remove
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
