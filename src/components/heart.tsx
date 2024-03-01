import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

import { useWishListContext } from "@/hooks/useWishListContext";

interface HeartLikeProps {
  id: number;
  name: string;
  liked: boolean;
  handleToggle: (id: number) => void;
}

export const HeartLike = ({
  id,
  name,
  liked,
  handleToggle,
}: HeartLikeProps) => {
  const { addToWishList, removeFromWishList } = useWishListContext();

  const handleLike = () => {
    handleToggle(id);

    if (!liked) {
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
        <button
          className={twMerge("heart-icon", liked ? "liked" : "")}
          onClick={handleLike}
        />
      </div>
    </div>
  );
};
