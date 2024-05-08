/* eslint-disable simple-import-sort/imports */
import { Link, useNavigate } from "react-router-dom";

import { useLikeContext } from "@/_features/WishList/hooks/useLikeContext";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Rate } from "@/components/ui/rate";

import CommentIcon from "../../../../public/icons/commentIcon.svg?react";
import Wishlist from "../../../../public/icons/wishlist.svg?react";

import { Description } from "./Description";
import { HeartLike } from "./heart";

interface ProductProps {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
}

export const Product = ({ id, imgUrl, name, price }: ProductProps) => {
  const navigate = useNavigate();
  const { likedItems, toggleLike } = useLikeContext();

  const isLiked = likedItems.some((item) => item.id === id);

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
                  <button className=" mt-1 w-7 cursor-default text-muted-foreground transition  duration-300 ease-in-out   hover:text-blue-600">
                    <Wishlist />
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
                  <button className="w-7 cursor-default text-muted-foreground transition  duration-300 ease-in-out   hover:text-blue-600">
                    <CommentIcon />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent
                  className="w-auto bg-blue-600 p-2"
                  sideOffset={6}
                  align="start"
                >
                  <a href="#comments" className="cursor-pointer text-white ">
                    View Comments
                  </a>
                </HoverCardContent>
              </HoverCard>
            </div>
            <HeartLike
              id={id}
              liked={isLiked}
              handleToggle={toggleLike}
              name={name}
            />
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
