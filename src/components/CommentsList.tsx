import { useCommentRenderStore } from '@/store/store';
import { Comments } from './Comments';
import { useParams } from 'react-router-dom';
import users from '@/data/user.json';

export const CommentsList = () => {
  const { productId } = useParams();
  const rootComments = useCommentRenderStore((state) =>
    state.getComments(Number(productId))
  );

  if (rootComments == null) return;

  return users.map(
    (comment) =>
      rootComments.postId === comment.postId && (
        <Comments key={comment.parentId} {...comment} />
      )
  );
};
