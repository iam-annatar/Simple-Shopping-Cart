import { useState } from "react";
import { toast } from "sonner";

import { useWishListContext } from "@/hooks/useWishListContext";

// type ItemInfo = (typeof allItems)[number];

interface HeartLikeProps {
  id: number;
  name: string;
  liked: boolean;
}

export const HeartLike = ({ id, name, liked }: HeartLikeProps) => {
  const { addToWishList, removeFromWishList } = useWishListContext();

  const [like, setLiked] = useState(liked);

  const toggleLike = () => {
    if (!like) {
      setLiked((prev) => !prev);
    } else {
      setLiked((prev) => !prev);
    }
  };

  const handelLike = () => {
    toggleLike();

    if (!like) {
      addToWishList(id);
      toast.success(`item "${name}" added to wishList`);
    } else {
      removeFromWishList(id);
      toast.warning(`item "${name}" removed from wishList`);
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <div className="heart-bg">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          className={`heart-icon ${like ? "liked" : ""}`}
          onClick={handelLike}
        />
      </div>
    </div>
  );
};
