import { useCommentStore } from '@/store/store';
import { useState } from 'react';
import { Button } from './ui/button';
import users from '@/data/user.json';
import { CommentCard } from './CommentCard';

type CommentProps = {
  parentId: number;
  id?: number;
  name: string;
  body: string;
};

export const Comments = ({ name, parentId, body, id }: CommentProps) => {
  const childComments = useCommentStore((state) =>
    state.getReplies(users, parentId, id ?? 0)
  );

  const [hideChild, setHideChild] = useState(true);

  const rep = childComments.map((r) => r.replies?.length);

  return (
    <div className="mb-4">
      <CommentCard parentId={parentId} body={body} name={name} />
      <Button
        size={'sm'}
        className={`bg-slate-500 hover:bg-slate-600 mt-2 dark:text-white ${
          !hideChild || rep.length === 0 ? 'hidden' : ''
        }`}
        onClick={() => setHideChild(false)}
      >
        Show Replies
      </Button>
      {childComments.map((comment) => (
        <div className={`${hideChild ? 'hidden' : ''}`} key={comment.name}>
          <div key={comment.parentId} className="flex  justify-end">
            <button
              className="child"
              aria-label="hide replies"
              onClick={() => setHideChild(true)}
            />
            <CommentCard
              parentId={comment.parentId}
              userName={
                comment.replies?.map((c) => c.id === parentId) ? name : ''
              }
              body={comment.body}
              name={comment.name}
            />
          </div>
          {comment.replies &&
            comment.replies.map((reply) => (
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
            ))}
        </div>
      ))}
    </div>
  );
};
