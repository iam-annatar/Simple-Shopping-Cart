import { useState } from "react";

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
        className={`mt-2 bg-slate-500 hover:bg-slate-600 dark:text-white ${
          !hideChild || replies.length === 0 ? "hidden" : ""
        }`}
        onClick={() => setHideChild(false)}
      >
        Show Replies
      </Button>
      {replies.map((comment) => (
        <div className={`${hideChild ? "hidden" : ""}`} key={comment.parentId}>
          <div key={comment.parentId} className="flex  justify-end">
            <button
              className="child"
              aria-label="hide replies"
              onClick={() => setHideChild(true)}
            />
            <CommentCard
              postId={postId}
              id={id}
              parentId={comment.parentId}
              userName={name}
              body={comment.body}
              name={comment.name}
            />
          </div>
          {comment.replies
            ? comment.replies.map((reply) => (
                <div key={reply.id} className="flex justify-end">
                  <button
                    className="child"
                    aria-label="hide replies"
                    onClick={() => setHideChild(true)}
                  />
                  <CommentCard
                    postId={postId}
                    id={id}
                    parentId={reply.parentId}
                    userName={comment.name}
                    body={reply.body}
                    name={reply.name}
                  />
                </div>
              ))
            : null}
        </div>
      ))}
    </div>
  );
};
