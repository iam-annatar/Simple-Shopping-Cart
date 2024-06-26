import type { ChangeEvent } from "react";
import { useState } from "react";

import type { Comment } from "@/_features/Comments/store/CommentStore";
import { useCommentStore } from "@/_features/Comments/store/CommentStore";
import { Button } from "@/components/ui/button";

interface CommentFormProps {
  initialValue: string;
  autoFocus?: boolean;
  postId: Comment["postId"];
}

export const CommentForm = ({
  initialValue,
  postId,
  autoFocus = false,
}: CommentFormProps) => {
  const [message, setMessage] = useState(initialValue);
  const addComment = useCommentStore((state) => state.addComment);
  const [error, setError] = useState(false);

  const user = `User-${crypto.randomUUID().slice(0, 4)}`;

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.length <= 1) {
      setError(true);
    } else {
      setError(false);
    }
    addComment({
      postId,
      id: Math.floor(Math.random() * 1000),
      parentId: Math.floor(Math.random() * 1000),
      body: message,
      name: user,
      replies: [],
    });
    setMessage("");
  };

  return (
    <>
      <form className="mb-8" id="comment" onSubmit={submitHandler}>
        <div className="flex items-end gap-2">
          <textarea
            placeholder="What are your thoughts?"
            className="h-[10rem] grow  resize-none rounded-sm border-2  bg-slate-50 p-[.5em] text-sm dark:bg-slate-950 "
            id="comment"
            autoFocus={autoFocus}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-blue-600 text-base font-bold text-white hover:bg-blue-700 "
          >
            Post
          </Button>
        </div>
      </form>
      {error ? <div className="text-red-500">Error</div> : null}
    </>
  );
};
