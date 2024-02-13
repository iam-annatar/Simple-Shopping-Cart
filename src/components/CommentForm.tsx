import { ChangeEvent, useState } from 'react';
import { Button } from './ui/button';
import { useCommentStore } from '@/store/store';

type CommentFormProps = {
  initialValue: string;
  autoFocus?: boolean;
  postId: number;
};

export const CommentForm = ({
  initialValue,
  postId,
  autoFocus = false,
}: CommentFormProps) => {
  const [message, setMessage] = useState(initialValue);
  const addComment = useCommentStore((state) => state.addComment);
  const [error, setError] = useState(false);

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.length <= 1) {
      setError(true);
    } else {
      setError(false);
    }
    addComment({
      postId: postId,
      parentId: Math.floor(Math.random() * 1000),
      body: message,
      name: 'User',
      replies: [],
    });
    setMessage('');
  };

  return (
    <>
      <form id="comment" onSubmit={submitHandler}>
        <div className="flex items-end gap-2">
          <textarea
            placeholder="What are your thoughts?"
            className="resize-none flex-grow  text-sm p-[.5em] h-[10rem]  bg-slate-50 dark:bg-slate-950 border-2 rounded-sm "
            id="comment"
            autoFocus={autoFocus}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            className="text-base bg-slate-500 font-bold hover:bg-slate-600 dark:text-white"
          >
            Post
          </Button>
        </div>
      </form>
      {error && <div className="text-red-500">Error</div>}
    </>
  );
};
