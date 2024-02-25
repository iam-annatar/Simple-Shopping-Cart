import { useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useShoppingContext } from "@/hooks/useShoppingContext";

export const WhishList = () => {
  const { likedItem } = useShoppingContext();
  const location = useLocation();

  return (
    <div className="mt-8">
      <div className="mb-8 text-center text-2xl">WishList</div>
      {likedItem(location.state).map((item) => {
        return (
          <table key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <img
                src={item.imgUrl}
                className="w-[12rem] rounded-md"
                alt="img"
              />
              <span className="text-lg">{item.name}</span>
              <span className="text-lg">{item.price}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="bg-blue-600 text-white transition-all hover:bg-blue-600/70"
            >
              Add to cart
            </Button>
          </table>
        );
      })}
    </div>
  );
};
