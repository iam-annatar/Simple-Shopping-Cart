import { useState } from 'react';

export const HeartLike = () => {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    if (!liked) {
      setLikesCount((c) => c + 1);
      setLiked(true);
    } else {
      setLikesCount((c) => c - 1);
      setLiked(false);
    }
  };

  return (
    <div className="flex items-center gap-2 relative">
      <div className="heart-bg">
        <div
          className={`heart-icon ${
            liked ? 'liked' : ''
          } absolute touch-disabled`}
          onClick={toggleLike}
        ></div>
      </div>
      <div className="text-muted-foreground">
        {likesCount !== 0 && likesCount}
      </div>
    </div>
  );
};
