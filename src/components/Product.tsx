import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { formatCurrency } from '@/utilities/formattCurrency';
import { useShoppingContext } from '@/hooks/useShoppingContext';
import { useState } from 'react';
import { toast } from 'sonner';
import { HeartLike } from './ui/heart';

type ProductProps = {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
};

export const Product = ({ id, imgUrl, name, price }: ProductProps) => {
  const [count, setCount] = useState(1);
  const { increaseCount } = useShoppingContext();

  const increaseHanler = () => {
    setCount((c) => c + 1);
  };
  const decreaseHandler = () => {
    count > 1 && setCount((c) => c - 1);
  };

  const totalPrice = formatCurrency((price ?? 0) * count);

  return (
    <>
      <div className="flex gap-2 text-gray-400 mb-4">
        <Link to={'/'}>Home</Link>
        <span className="font-bold">{'>'}</span>
        <Link to={'/store'}>Store</Link>
        <span className="font-bold">{'>'}</span>
        <Link className="text-gray-700 dark:text-gray-200" to={'#'}>
          Product {id}
        </Link>
      </div>
      <div className="md:flex gap-6 ">
        <div className="mb-4">
          <img
            className="sm:h-[25rem] sm:w-[160rem] object-cover"
            src={imgUrl}
            alt="img"
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-2">
              <button className="text-muted-foreground w-7 hover:text-blue-600 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18.25 14.64a2.56 2.56 0 0 0-3 .58l-5.34-2.58c.11-.42.11-.86 0-1.28l5.35-2.58a2.57 2.57 0 1 0-.65-1.35l-5.49 2.65a2.57 2.57 0 1 0 0 3.84l5.49 2.65a2.56 2.56 0 1 0 3.64-1.93Z"
                  />
                </svg>
              </button>

              <button className="text-muted-foreground w-7 hover:text-blue-600  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M15.23 6h-9.6a3 3 0 0 0-3 3v5.86a3 3 0 0 0 2.2 2.89 1 1 0 0 1 .8 1v1.92a.49.49 0 0 0 .85.35l2.84-2.83a1 1 0 0 1 .7-.29h5.21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3Zm-7.8 6.86a1 1 0 1 1 1-1 1 1 0 0 1-1 .99v.01Zm3 0a1 1 0 1 1 1-1 1 1 0 0 1-1 .99v.01Zm3 0a1 1 0 1 1 1-1 1 1 0 0 1-1 .99v.01Z"
                  />
                  <path
                    fill="currentColor"
                    d="M21.37 5.86v5.85a3 3 0 0 1-1.68 2.69V7.53a3 3 0 0 0-3-3H6.09a3 3 0 0 1 2.68-1.67h9.6a3 3 0 0 1 3 3Z"
                  />
                </svg>
              </button>
            </div>
            <HeartLike />
          </div>
        </div>
        <main className="sm:flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl">{name}</h1>
            <div className="flex items-center gap-1 flex-col">
              <span className="text-sm text-muted-foreground">
                Click to rate!
              </span>
              <div>Rate</div>
            </div>
          </div>
          <p className="text-sm mb-4 text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            commodo varius lacus vel dignissim. Mauris dignissim placerat ex, a
            fringilla orci. Donec aliquet quis sapien porta condimentum.Mauris
            dignissim, ante non fringilla finibus, libero lectus dui, at
            interdum urna nisi ac ex. Vestibulum in tempus nibh.
          </p>
          <span className="text-2xl font-bold ">
            {formatCurrency(price ?? 0)}
          </span>

          <div className="grid place-items-start gap-6 mb-8 mt-4  sm:flex sm:mb-8 sm:gap-2 sm:items-center sm:justify-between">
            <div className="grid  sm:place-items-center gap-2 ">
              <div className="text-lg text-muted-foreground">Choose Color</div>
              <div className="flex gap-3">
                <Button
                  size={'sm'}
                  className="rounded-full  outline outline-2 outline-white bg-slate-600 h-6 hover:bg-slate-600"
                ></Button>
                <Button
                  size={'sm'}
                  className="rounded-full outline outline-2 outline-white h-6 bg-black hover:bg-black"
                ></Button>
                <Button
                  size={'sm'}
                  className="rounded-full outline outline-2 outline-white bg-stone-700 h-6 hover:bg-stone-700"
                ></Button>
              </div>
            </div>
            <div className=" grid sm:place-items-center gap-[6px]">
              <div className="text-lg text-muted-foreground">
                Choose quantity
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={decreaseHandler}
                  size={'sm'}
                  className="w-7 h-7 bg-blue-600 hover:bg-blue-600/90 text-white"
                >
                  -
                </Button>
                <span>{count}</span>
                <Button
                  onClick={increaseHanler}
                  size={'sm'}
                  className="w-7 h-7 bg-blue-600 hover:bg-blue-600/90 text-white"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 py-4  border-t ">
            <Button
              onClick={() => {
                if (id == null) return;
                toast.success(`Item "${name}" added to your cart`);
                increaseCount(id, count);
              }}
              className="w-full text-lg bg-blue-600 hover:bg-blue-600/90 text-white"
            >
              Add to cart
            </Button>
            <div className="2xs:text-2xl font-bold">
              {count === 1 ? formatCurrency(price ?? 0) : totalPrice}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
