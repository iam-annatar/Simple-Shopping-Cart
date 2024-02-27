import { toast } from "sonner";

import { useWishListContext } from "@/hooks/useWishListContext";

interface HeartLikeProps {
  id: number;
  name: string;
}

export const HeartLike = ({ id, name }: HeartLikeProps) => {
  const { addToWishList, liked, likesCount, toggleLike } = useWishListContext();

  const handelLike = () => {
    toggleLike();

    if (!liked) {
      addToWishList(id);
      toast.success(`item "${name}" added to wish list`);
    } else {
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
      <div className="text-muted-foreground">{likesCount}</div>
    </div>
  );
};
