import { TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useWishListContext } from "@/hooks/useWishListContext";

export const WhishListPage = () => {
  const { wishList } = useWishListContext();

  return (
    <div className="mt-8">
      <div className="mb-8 text-center text-2xl">WishList</div>
      {wishList.map((item) => {
        return (
          <div
            key={item.id}
            className="mb-8 flex  justify-evenly gap-4 border-b-2 p-4 sm:justify-evenly sm:p-8"
          >
            <img
              src={item.imgUrl}
              className="w-2/4 rounded-lg object-cover sm:w-2/5"
              alt="img"
            />
            <div className="grid items-center justify-between gap-4 align-bottom sm:flex">
              <div className="grid items-center gap-3 sm:flex sm:gap-8">
                <span className="text-lg">{item.name}</span>
                <span className=" text-muted-foreground">{item.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  className="bg-blue-600 text-white transition-all hover:bg-blue-600/70 sm:w-full"
                >
                  Add to cart
                </Button>
                <TrashIcon className="block cursor-pointer text-red-400 transition-all  duration-500 hover:text-red-600 sm:hidden" />
                <Button
                  variant="ghost"
                  className="hidden bg-red-500 text-white  transition-all duration-500 hover:bg-red-600 sm:block sm:w-full "
                >
                  Remove from WishList
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
