import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { CommentCard } from "./CommentCard";
import { Button } from "./ui/button";

interface CommentProps {
  parentId: number;
  id: number;
  name: string;
  body: string;
  postId?: number;
  replies: CommentProps[];
}

export const Comments = ({
  name,
  postId,
  parentId,
  body,
  id,
  replies,
}: CommentProps) => {
  const [hideChild, setHideChild] = useState(true);

  const renderComments = (comment: CommentProps) => (
    <div key={comment.id}>
      <div className="flex justify-end">
        <button
          className="child"
          aria-label="hide replies"
          onClick={() => setHideChild(true)}
        />
        <CommentCard
          postId={comment.postId}
          id={comment.id}
          parentId={comment.parentId}
          userName={comment.name}
          body={comment.body}
          name={comment.name}
        />
      </div>
      {comment.replies.map((reply) => renderComments(reply))}
    </div>
  );

  return (
    <div className="mb-4">
      <CommentCard
        id={id}
        postId={postId}
        parentId={parentId}
        body={body}
        name={name}
      />
      <Button
        size="sm"
        className={twMerge(
          "mt-2 bg-slate-500 hover:bg-slate-600 dark:text-white",
          !hideChild || replies.length === 0 ? "hidden" : "",
        )}
        onClick={() => setHideChild(false)}
      >
        Show Replies
      </Button>
      {replies.map((comment) => (
        <div className={twMerge(hideChild ? "hidden" : "")} key={comment.id}>
          {renderComments(comment)}
        </div>
      ))}
    </div>
  );
};
