// import { useState } from 'react';

import { useShoppingContext } from '@/hooks/useShoppingContext';

export const HeartLike = () => {
  const { liked, likesCount, toggleLike } = useShoppingContext();

  return (
    <div className="flex items-center gap-2 relative">
      <div className="heart-bg">
        <div
          className={`heart-icon ${liked ? 'liked' : ''}`}
          onClick={toggleLike}
        ></div>
      </div>
      <div className="text-muted-foreground">{likesCount}</div>
    </div>
  );
};
