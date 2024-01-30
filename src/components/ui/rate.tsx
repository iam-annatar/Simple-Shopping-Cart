import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Rating, Typography } from '@material-tailwind/react';

export const Rate = () => {
  const [rateCount, setRateCount] = useLocalStorage('rate', 0);

  const rateHanler = (value: number) => {
    setRateCount(value);
  };

  return (
    <div className="flex gap-2">
      <Rating
        className="text-yellow-500"
        placeholder="rate"
        value={rateCount}
        onChange={rateHanler}
      />
      <Typography
        className="text-muted-foreground"
        placeholder="rate"
      >{`${rateCount} / 5`}</Typography>
    </div>
  );
};
