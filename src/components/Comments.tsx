import { useState } from "react";

import users from "@/data/user.json";
import { useCommentStore } from "@/store/store";

import { CommentCard } from "./CommentCard";
import { Button } from "./ui/button";

interface CommentProps {
  parentId: number;
  id?: number;
  name: string;
  body: string;
  // postId?: number;
}

export const Comments = ({
  name,
  // postId,
  parentId,
  body,
  id,
}: CommentProps) => {
  const childComments = useCommentStore((state) =>
    state.getReplies(users, parentId, id ?? 0),
  );

  const [hideChild, setHideChild] = useState(true);

  const rep = childComments.map((r) => r.replies?.length);

  return (
    <div className="mb-4">
      <CommentCard
        // postId={postId}
        parentId={parentId}
        body={body}
        name={name}
      />
      <Button
        size="sm"
        className={`mt-2 bg-slate-500 hover:bg-slate-600 dark:text-white ${
          !hideChild || rep.length === 0 ? "hidden" : ""
        }`}
        onClick={() => setHideChild(false)}
      >
        Show Replies
      </Button>
      {childComments.map((comment) => (
        <div className={`${hideChild ? "hidden" : ""}`} key={comment.name}>
          <div key={comment.parentId} className="flex  justify-end">
            <button
              className="child"
              aria-label="hide replies"
              onClick={() => setHideChild(true)}
            />
            <CommentCard
              parentId={comment.parentId}
              userName={
                comment.replies?.map((c) => c.id === parentId) ? name : ""
              }
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
