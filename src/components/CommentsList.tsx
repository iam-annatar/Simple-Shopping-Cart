import { useParams } from "react-router-dom";

import { useCommentStore } from "@/store/CommentStore";

import { CommentForm } from "./CommentForm";
import { Comments } from "./Comments";

export const CommentsList = () => {
  const { productId } = useParams();
  const comments = useCommentStore((state) => state.comments);

  return (
    <>
      <CommentForm initialValue="" postId={Number(productId)} />
      {comments.map(
        (comment) =>
          comment.postId === Number(productId) && (
            <Comments key={comment.parentId} {...comment} />
          ),
      )}
    </>
  );
};
