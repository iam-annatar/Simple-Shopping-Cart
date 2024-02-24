import type { ChangeEvent } from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { useCommentStore } from "@/store/store";

import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface ReplyFormProps {
  id: number;
  postId?: number;
  autoFocus: boolean;
  userName?: string;
  onClose: () => void;
}

export const ReplyForm = ({
  postId,
  id,
  onClose,
  userName,
  autoFocus = false,
}: ReplyFormProps) => {
  const [message, setMessage] = useState("");
  const updateReplies = useCommentStore((state) => state.updateReplies);

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateReplies(
      {
        postId,
        parentId: Math.floor(Math.random() * 10000),
        id,
        name: `User-${crypto.randomUUID().slice(0, 2)}`,
        body: message,
        replies: [],
      },
      id,
    );
    onClose();
  };

  return (
    <Card className="mb-4 border-none bg-none px-4 shadow-none">
      <div className="flex items-center gap-2">
        <span className="font-bold text-muted-foreground">User</span>
        <span className="text-sm font-normal text-muted-foreground">
          Reply to
        </span>
        <span
          className={twMerge(
            userName == null && "hidden",
            "cursor-pointer font-normal text-blue-500",
          )}
        >
          {`@${userName}`}
        </span>
      </div>

      <form id="comment" onSubmit={submitHandler}>
        <div className="flex flex-col gap-2">
          <textarea
            placeholder="What are your thoughts?"
            className="mt-2 h-[10rem] grow resize-none rounded-sm border-2  bg-slate-50 p-[.5em] text-sm dark:bg-slate-950 "
            id="comment"
            autoFocus={autoFocus}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex gap-2">
            <Button
              onClick={onClose}
              size="sm"
              className="bg-red-500 text-base text-white hover:bg-red-600"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit"
              className="bg-blue-600 text-base text-white  hover:bg-blue-700 "
            >
              Post
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};
