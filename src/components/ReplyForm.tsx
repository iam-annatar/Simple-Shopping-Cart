import type { ChangeEvent } from "react";
import { useState } from "react";

import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface ReplyFormProps {
  autoFocus: boolean;
  userName?: string;
  onClose: () => void;
}

export const ReplyForm = ({
  onClose,
  userName,
  autoFocus = false,
}: ReplyFormProps) => {
  const [message, setMessage] = useState("");

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Card className="mb-4 border-none bg-none px-4 shadow-none">
      <div className="flex items-center gap-2">
        <span className="font-bold text-muted-foreground">User</span>
        <span className="text-sm font-normal text-muted-foreground">
          Reply to
        </span>
        <span
          className={` ${
            userName == null && "hidden"
          } cursor-pointer font-normal text-blue-500`}
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
              className="bg-slate-500 text-base  hover:bg-slate-600 dark:text-white"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit"
              className="bg-slate-500 text-base  hover:bg-slate-600 dark:text-white"
            >
              Post
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};
