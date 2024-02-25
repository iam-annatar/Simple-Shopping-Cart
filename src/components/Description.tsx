import { useState } from "react";
import { toast } from "sonner";

import { useShoppingContext } from "@/hooks/useShoppingContext";
import { formatCurrency } from "@/utilities/formattCurrency";

import { Button } from "./ui/button";

interface DescriptionProps {
  price: number;
  name: string;
  id: number;
}

export const Description = ({ price, name, id }: DescriptionProps) => {
  const [count, setCount] = useState(1);
  const { increaseCount } = useShoppingContext();

  const increaseHanler = () => {
    setCount((c) => c + 1);
  };

  const decreaseHandler = () => {
    if (count > 1) {
      setCount((c) => c - 1);
    }
  };

  const totalPrice = formatCurrency(price * count);

  return (
    <>
      <p className="mb-4 text-sm text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo
        varius lacus vel dignissim. Mauris dignissim placerat ex, a fringilla
        orci. Donec aliquet quis sapien porta condimentum.Mauris dignissim, ante
        non fringilla finibus, libero lectus dui, at interdum urna nisi ac ex.
        Vestibulum in tempus nibh.
      </p>
      <span className="text-2xl font-bold ">{formatCurrency(price)}</span>

      <div className="mb-8 mt-4 grid place-items-start gap-6  sm:mb-8 sm:flex sm:items-center sm:justify-between sm:gap-2">
        <div className="grid  gap-2 sm:place-items-center ">
          <div className="text-lg text-muted-foreground">Choose Color</div>
          <div className="flex gap-3">
            <Button
              size="sm"
              className="h-6  rounded-full bg-slate-600 outline outline-2 outline-white hover:bg-slate-600"
            />
            <Button
              size="sm"
              className="h-6 rounded-full bg-black outline outline-2 outline-white hover:bg-black"
            />
            <Button
              size="sm"
              className="h-6 rounded-full bg-stone-700 outline outline-2 outline-white hover:bg-stone-700"
            />
          </div>
        </div>
        <div className=" grid gap-[6px] sm:place-items-center">
          <div className="text-lg text-muted-foreground">Choose quantity</div>
          <div className="flex gap-2">
            <Button
              onClick={decreaseHandler}
              size="sm"
              className="size-7 bg-blue-600 text-white hover:bg-blue-600/90"
            >
              -
            </Button>
            <span>{count}</span>
            <Button
              onClick={increaseHanler}
              size="sm"
              className="size-7 bg-blue-600 text-white hover:bg-blue-600/90"
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 border-t  py-4 ">
        <Button
          onClick={() => {
            if (id == null) return;
            toast.success(`Item "${name}" added to your cart`);
            increaseCount(id, count);
          }}
          className="w-full bg-blue-600 text-lg text-white hover:bg-blue-600/90"
        >
          Add to cart
        </Button>
        <div className="font-bold 3xs:text-2xl">
          {count === 1 ? formatCurrency(price) : totalPrice}
        </div>
      </div>
    </>
  );
};
