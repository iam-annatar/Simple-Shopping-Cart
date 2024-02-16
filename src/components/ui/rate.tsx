import { Rating, Typography } from "@material-tailwind/react";

import { useShoppingContext } from "@/hooks/useShoppingContext";

export const Rate = () => {
  const { rateCount, rateHandler } = useShoppingContext();

  return (
    <div className="flex gap-2">
      <Rating
        className="text-yellow-500"
        placeholder="rate"
        value={rateCount}
        onChange={rateHandler}
      />
      <Typography
        className="text-muted-foreground"
        placeholder="rate"
      >{`${rateCount} / 5`}</Typography>
    </div>
  );
};
