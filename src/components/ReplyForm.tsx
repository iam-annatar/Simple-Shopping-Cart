import { ChangeEvent, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

type ReplyFormProps = {
  autoFocus: boolean;
  userName?: string;
  onClose: () => void;
};

export const ReplyForm = ({
  onClose,
  userName,
  autoFocus = false,
}: ReplyFormProps) => {
  const [message, setMessage] = useState('');

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Card className="px-4 mb-4 bg-none shadow-none border-none">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground font-bold">User</span>
          <span className="text-sm font-normal text-muted-foreground">
            Reply to
          </span>
          <span
            className={` ${
              userName == null && 'hidden'
            } text-blue-500 cursor-pointer font-normal`}
          >
            {`@${userName}`}
          </span>
        </div>

        <form id="comment" onSubmit={submitHandler}>
          <div className="flex flex-col gap-2">
            <textarea
              placeholder="What are your thoughts?"
              className="resize-none flex-grow mt-2 text-sm p-[.5em] h-[10rem]  bg-slate-50 dark:bg-slate-950 border-2 rounded-sm "
              id="comment"
              autoFocus={autoFocus}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                onClick={onClose}
                size={'sm'}
                className="text-base bg-slate-500  hover:bg-slate-600 dark:text-white"
              >
                Cancel
              </Button>
              <Button
                size={'sm'}
                type="submit"
                className="text-base bg-slate-500  hover:bg-slate-600 dark:text-white"
              >
                Post
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </>
  );
};
