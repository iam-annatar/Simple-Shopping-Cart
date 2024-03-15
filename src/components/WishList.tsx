import { TrashIcon } from "lucide-react";

import { useLikeContext } from "@/hooks/useLikeContext";
import { useShoppingContext } from "@/hooks/useShoppingContext";
import { useWishListContext } from "@/hooks/useWishListContext";

import { Button } from "./ui/button";

interface WishListProps {
  name: string;
  price: number;
  imgUrl: string;
  id: number;
}

export const WishList = ({ name, price, imgUrl, id }: WishListProps) => {
  const { increaseCount } = useShoppingContext();
  const { removeFromWishList } = useWishListContext();
  const { toggleLike } = useLikeContext();

  return (
    <div className="mb-8 flex  justify-evenly gap-4 border-b-2 p-4 sm:justify-evenly sm:p-8">
      <img
        src={imgUrl}
        className="w-2/4 rounded-lg object-cover sm:w-2/5"
        alt="img"
      />
      <div className="grid  items-center justify-between gap-4 align-bottom sm:flex">
        <div className="grid  items-center gap-3 sm:flex sm:gap-8">
          <span className="text-lg">{name}</span>
          <span className=" text-muted-foreground">{price}</span>
        </div>
        <div className="flex  items-center gap-2">
          <Button
            onClick={() => increaseCount(id)}
            variant="ghost"
            className="bg-blue-600 text-white transition-all hover:bg-blue-600/70 sm:w-full"
          >
            Add to cart
          </Button>
          <TrashIcon
            onClick={() => {
              removeFromWishList(id);
              toggleLike(id);
            }}
            className="block cursor-pointer text-red-400 transition-all  duration-500 hover:text-red-600 sm:hidden"
          />
          <Button
            onClick={() => removeFromWishList(id)}
            variant="ghost"
            className="hidden bg-red-500 text-white  transition-all duration-500 hover:bg-red-600 sm:block sm:w-full "
          >
            Remove from WishList
          </Button>
        </div>
      </div>
    </div>
  );
};
