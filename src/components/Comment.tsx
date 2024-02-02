import { EditIcon, HeartIcon, ReplyIcon, TrashIcon } from 'lucide-react';
import { CommentIcons } from './CommentIcons';
import { Card, CardContent } from './ui/card';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

type CommentProps = {
  userName: string;
  postId: number;
  body: string;
};

export const Comments = ({ userName, body }: CommentProps) => {
  return (
    <>
      <Card className="border shadow-sm rounded-md mt-4 p-2 bg-slate-50 dark:bg-slate-950 dark:border ">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-bold">{userName}</span>
          <span className="text-muted-foreground text-sm">
            {dateFormatter.format(new Date())}
          </span>
        </div>
        <CardContent className="p-4">
          <div className="">{body}</div>
        </CardContent>
        <div className="flex gap-2 ">
          <CommentIcons icon={<HeartIcon className="w-5" />} aria-label="Like">
            2
          </CommentIcons>

          <CommentIcons
            icon={<ReplyIcon className="w-5" />}
            aria-label="Reply"
          />
          <CommentIcons icon={<EditIcon className="w-5" />} aria-label="Edit" />
          <CommentIcons
            icon={<TrashIcon className="w-5" />}
            aria-label="Delete"
            color="red"
          />
        </div>
      </Card>
    </>
  );
};
