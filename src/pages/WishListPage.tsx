import { twMerge } from "tailwind-merge";

import { WishList } from "@/components/WishList";
import { useWishListContext } from "@/hooks/useWishListContext";

export const WhishListPage = () => {
  const { wishList } = useWishListContext();

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
      </div>
      {wishList.map((item) => {
        return <WishList key={item.id} {...item} />;
      })}
    </div>
  );
};
