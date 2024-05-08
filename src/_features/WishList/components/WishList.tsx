/* eslint-disable tailwindcss/classnames-order */
import { PlusCircle, TrashIcon } from "lucide-react";

import { useShoppingContext } from "@/_features/ShoppingStore/hooks/useShoppingContext";
import { useLikeContext } from "@/_features/WishList/hooks/useLikeContext";
import { useWishListContext } from "@/_features/WishList/hooks/useWishListContext";
import { Button } from "@/components/ui/button";

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
    <div className="flex gap-4 flex-wrap items-center justify-center p-4 border-b ">
      <img
        src={imgUrl}
        className="w-[15rem] rounded-lg object-cover "
        alt="img"
      />

      <div className="flex items-center gap-3">
        <span className="text-lg">{name}</span>
        <span className=" text-muted-foreground">{price}</span>
        <div className="flex items-center gap-2">
          <PlusCircle
            onClick={() => {
              increaseCount(id);
            }}
            className="block cursor-pointer text-blue-400 transition-all  duration-500 hover:text-blue-600 sm:hidden"
          />
          <Button
            onClick={() => increaseCount(id)}
            variant="ghost"
            className="hidden bg-blue-600 text-white transition-all hover:bg-blue-600/70 sm:block sm:w-full"
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
            onClick={() => {
              removeFromWishList(id);
              toggleLike(id);
            }}
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
