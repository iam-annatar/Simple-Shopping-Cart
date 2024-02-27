import { WishList } from "@/components/WishList";
import { useWishListContext } from "@/hooks/useWishListContext";

export const WhishListPage = () => {
  const { wishList } = useWishListContext();

  return (
    <div className="mt-4">
      <div className="mb-8 text-xl font-bold">WishList</div>
      {wishList.map((item) => {
        return <WishList key={item.id} {...item} />;
      })}
    </div>
  );
};
