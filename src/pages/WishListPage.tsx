import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/ui/button";
import { WishList } from "@/components/WishList";
import { useWishListContext } from "@/hooks/useWishListContext";

export const WhishListPage = () => {
  const { wishList } = useWishListContext();
  const navigate = useNavigate();

  return (
    <div className="mt-4">
      <div className="mb-8 text-xl font-bold">WishList</div>
      <div
        className={twMerge(
          "hidden text-center text-xl ",
          wishList.length === 0 && "block",
        )}
      >
        Your wishList is empty !
        <div className="mt-8">
          <Button
            onClick={() => navigate("/store")}
            variant="ghost"
            className="text-blue-500 hover:font-semibold hover:text-blue-600"
          >
            View Store
          </Button>
        </div>
      </div>
      {wishList.map((item) => {
        return <WishList key={item.id} {...item} />;
      })}
    </div>
  );
};
