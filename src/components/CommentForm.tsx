import { ChangeEvent, useState } from 'react';
import { Button } from './ui/button';

export const CommentForm = () => {
  const [message, setMessage] = useState('');

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form id="comment" onSubmit={submitHandler}>
      <div className="flex items-end gap-2">
        <textarea
          placeholder="share your comment"
          className="resize-none flex-grow focus:outline-none text-sm p-[.5em] h-[4.5rem]  bg-slate-100 dark:bg-slate-950 border-2 rounded-sm "
          id="comment"
          cols={40}
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button className="text-base bg-slate-500 font-bold hover:bg-slate-600 dark:text-white">
          Post
        </Button>
      </div>
    </form>
  );
};
