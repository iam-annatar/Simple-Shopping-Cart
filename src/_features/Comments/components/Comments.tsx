import { useState } from "react";
import { twMerge } from "tailwind-merge";

import type { Comment } from "@/_features/Comments/store/CommentStore";
import { useCommentStore } from "@/_features/Comments/store/CommentStore";
import { Button } from "@/components/ui/button";

import { CommentCard } from "./CommentCard";

interface CommentProps {
  comment: Comment;
}

export const Comments = ({ comment }: CommentProps) => {
  const [hideChild, setHideChild] = useState(true);
  const comments = useCommentStore((state) => state.comments);
  const username = useCommentStore((state) =>
    state.getUsername(comments, comment.id),
  );

  const renderComments = (cm: Comment) => (
    <div key={cm.id}>
      <div className="flex justify-end">
        <button
          className="child"
          aria-label="hide replies"
          onClick={() => setHideChild(true)}
        />
        <CommentCard comment={cm} username={username} />
      </div>
      {cm.replies.map((reply) => renderComments(reply))}
    </div>
  );

  return (
    <div className="mb-4">
      <CommentCard comment={comment} />
      <Button
        size="sm"
        className={twMerge(
          "mt-2 bg-slate-500 hover:bg-slate-600 dark:text-white",
          !hideChild || comment.replies.length === 0 ? "hidden" : "",
        )}
        onClick={() => setHideChild(false)}
      >
        Show Replies
      </Button>
      {comment.replies.map((rep) => (
        <div className={twMerge(hideChild ? "hidden" : "")} key={rep.id}>
          {renderComments(rep)}
        </div>
      ))}
    </div>
  );
};
