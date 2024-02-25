import { useShoppingContext } from "@/hooks/useShoppingContext";

export const HeartLike = () => {
  const { liked, likesCount, toggleLike } = useShoppingContext();

  return (
    <div className="relative flex items-center gap-2">
      <div className="heart-bg">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          className={`heart-icon ${liked ? "liked" : ""}`}
          onClick={toggleLike}
        />
      </div>
      <div className="text-muted-foreground">{likesCount}</div>
    </div>
  );
};
