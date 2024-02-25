import { Link, useNavigate } from "react-router-dom";

import { Description } from "./Description";
import { HeartLike } from "./heart";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Rate } from "./ui/rate";

interface ProductProps {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
}

export const Product = ({ id, imgUrl, name, price }: ProductProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mb-4 flex gap-2 text-gray-400">
        <Link to="/">Home</Link>
        <span className="font-bold">{">"}</span>
        <Link to="/store">Store</Link>
        <span className="font-bold">{">"}</span>
        <Link className="text-gray-700 dark:text-gray-200" to="#">
          Product {id}
        </Link>
      </div>
      <div className="gap-6 md:flex ">
        <div className="mb-4">
          <img
            className="object-cover sm:h-[25rem] sm:w-[160rem]"
            src={imgUrl}
            alt="img"
          />
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HoverCard>
                <HoverCardTrigger>
                  <button
                    onClick={() => navigate("/wishlist", { state: id })}
                    className="mt-1 w-7 text-muted-foreground transition delay-150 duration-300 ease-in-out  hover:-translate-y-1 hover:scale-110  hover:text-blue-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M10 10h4m-2-2v4m-6 7.58V6.42a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v13.16a1 1 0 0 1-1.55.84l-4.45-3-4.45 3A1 1 0 0 1 6 19.58Z"
                      />
                    </svg>
                  </button>
                </HoverCardTrigger>
                <HoverCardContent
                  className="w-auto bg-blue-600 p-2"
                  sideOffset={1}
                  onClick={() => navigate("/wishlist")}
                  align="start"
                >
                  <div className="cursor-pointer text-white ">
                    View your wishList
                  </div>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button className="w-7 text-muted-foreground transition  delay-150 duration-300 ease-in-out  hover:-translate-y-1 hover:scale-110  hover:text-blue-600">
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
                </HoverCardTrigger>
                <HoverCardContent
                  className="w-auto bg-blue-600 p-2"
                  sideOffset={6}
                  align="start"
                >
                  <div className="  cursor-pointer text-white ">
                    View Comments
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <HeartLike />
          </div>
        </div>
        <main className="flex-col sm:flex">
          <div className="mb-8 grid items-center justify-between gap-4 2xs:flex">
            <h1 className="text-3xl">{name}</h1>
            <div className="flex flex-col items-center gap-1">
              <span className="self-start text-muted-foreground 2xs:self-center 2xs:text-sm">
                Click to rate!
              </span>
              <Rate />
            </div>
          </div>
          <Description name={name} price={price} id={id} />
        </main>
      </div>
    </>
  );
};
