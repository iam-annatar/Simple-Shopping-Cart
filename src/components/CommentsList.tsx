import { useCommentRenderStore } from '@/store/store';
import { Comments } from './Comment';
import { useParams } from 'react-router-dom';

type CommentsListProps = {
  id: number;
  name: string;
  postId: number;
  body: string;
};

export const CommentsList = ({ id, name, postId, body }: CommentsListProps) => {
  const { productId } = useParams();
  const user = useCommentRenderStore((state) =>
    state.getUser(Number(productId))
  );

  if (user == null) return;

  return (
    user?.postId === postId && (
      <Comments userName={name} body={body} key={id} postId={postId} />
    )
  );
};
