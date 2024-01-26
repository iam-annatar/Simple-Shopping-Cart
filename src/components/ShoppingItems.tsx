import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useShoppingContext } from '@/hooks/useShoppingContext';
import { formatCurrency } from '@/utilities/formattCurrency';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { LazyLoading } from './LazyLoading';
import { Link } from 'react-router-dom';

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
  const [isLoadig, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoadig]);

  if (isLoadig) {
    return <LazyLoading />;
  }

  return (
    <>
      <Card className="h-[21.5rem] shadow-md dark:bg-slate-900 ">
        <Link to={`/store/${id}`}>
          <img
            src={imgUrl}
            className="object-cover w-full h-[200px] rounded-t-sm"
            alt=""
          />
        </Link>
        <CardContent>
          <Link to={`/store/${id}`}>
            <div className="cursor-pointer flex justify-between items-center align-baseline mt-4">
              <span className=" text-lg font-medium">{name}</span>{' '}
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
            <div className="grid grid-cols-1 grid-rows-2 place-items-center mx-auto gap-2">
              <div className="flex items-center gap-2">
                <Button
                  size={'sm'}
                  onClick={() => {
                    count === 1 &&
                      toast.warning(`Item "${name}" removed from your cart`);
                    decreaseCount(id);
                  }}
                  className="bg-blue-600 hover:bg-blue-600/90 w-3 h-7 rounded-sm dark:text-white "
                >
                  -
                </Button>
                <div>
                  <span className="text-lg">{count}</span> in cart
                </div>
                <Button
                  size={'sm'}
                  onClick={() => increaseCount(id)}
                  className="bg-blue-600 hover:bg-blue-600/90 w-3 h-7  rounded-sm dark:text-white"
                >
                  +
                </Button>
              </div>
              <Button
                onClick={() => {
                  toast.warning(`Item "${name}" removed from your cart`);
                  removeItem(id);
                }}
                className="bg-red-600 hover:bg-red-600/90 w-16 h-7 rounded-sm dark:text-white"
              >
                Remove
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </>
  );
};
