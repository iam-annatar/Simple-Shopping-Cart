import { ChangeEvent, useState } from 'react';
import { Button } from './ui/button';

type CommentFormProps = {
  loading: boolean;
  onSubmit: (message: string) => Promise<void>;
  initialValue: string;
  autoFocus: boolean;
};

export const CommentForm = ({
  loading,
  onSubmit,
  autoFocus = false,
  initialValue = '',
}: CommentFormProps) => {
  const [message, setMessage] = useState(initialValue);

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(message).then(() => setMessage(''));
  };

  return (
    <>
      <form id="comment" onSubmit={submitHandler}>
        <div className="flex items-end gap-2">
          <textarea
            placeholder="share your comment"
            className="resize-none flex-grow  text-sm p-[.5em] h-[4.5rem]  bg-slate-50 dark:bg-slate-950 border-2 rounded-sm "
            id="comment"
            autoFocus={autoFocus}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            className="text-base bg-slate-500 font-bold hover:bg-slate-600 dark:text-white"
            disabled={loading}
          >
            {loading ? 'Loading' : 'Post'}
          </Button>
        </div>
      </form>
    </>
  );
};
