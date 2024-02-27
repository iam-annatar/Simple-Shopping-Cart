import { toast } from "sonner";

import { useWishListContext } from "@/hooks/useWishListContext";

interface HeartLikeProps {
  id: number;
  name: string;
  // liked: boolean;
}

export const HeartLike = ({ id, name }: HeartLikeProps) => {
  const { toggleLike, addToWishList, removeFromWishList, liked } =
    useWishListContext();

  const handelLike = () => {
    toggleLike();

    if (!liked) {
      addToWishList(id);
      toast.success(`item "${name}" added to wish list`);
    } else {
      removeFromWishList(id);
      toast.warning(`item "${name}" removed from wish list`);
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <div className="heart-bg">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          className={`heart-icon ${liked ? "liked" : ""}`}
          onClick={handelLike}
        />
      </div>
    </div>
  );
};
