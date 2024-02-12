import { useCommentStore } from '@/store/store';
import { Comments } from './Comments';
import { useParams } from 'react-router-dom';
import { CommentForm } from './CommentForm';

export const CommentsList = () => {
  const { productId } = useParams();
  const comments = useCommentStore((state) => state.comments);
  const rootComments = useCommentStore((state) =>
    state.getComments(Number(productId))
  );

  if (rootComments == null) return;

  return (
    <>
      <CommentForm initialValue="" postId={Number(productId)} />
      {comments.map(
        (comment) =>
          comment.postId === rootComments.postId && (
            <Comments key={comment.parentId} {...comment} />
          )
      )}
    </>
  );
};
