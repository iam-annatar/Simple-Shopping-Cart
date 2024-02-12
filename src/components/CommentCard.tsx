import { EditIcon, HeartIcon, ReplyIcon, TrashIcon } from 'lucide-react';
import { CommentIcons } from './CommentIcons';
import { Card, CardContent } from './ui/card';
import { useCommentStore } from '@/store/store';

type CommentCardProps = {
  body: string;
  userName?: string;
  name: string;
  parentId: number;
};

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export const CommentCard = ({
  body,
  name,
  userName,
  parentId,
}: CommentCardProps) => {
  const removeComment = useCommentStore((state) => state.removeComment);

  return (
    <Card className="w-full border shadow-sm rounded-md mt-4 p-2 bg-slate-50 dark:bg-slate-950 dark:border ">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground font-bold">
          {name}
          <span
            className={`${
              userName == null && 'hidden'
            } text-blue-500 ml-2 cursor-pointer font-normal`}
          >
            <span className="text-sm text-muted-foreground sm:ml-4 mr-2">
              Reply to
            </span>
            {`@${userName}`}
          </span>
        </span>
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

        <CommentIcons icon={<ReplyIcon className="w-5" />} aria-label="Reply" />
        <CommentIcons icon={<EditIcon className="w-5" />} aria-label="Edit" />
        <CommentIcons
          icon={
            <TrashIcon
              onClick={() => removeComment(parentId)}
              className="w-5"
            />
          }
          aria-label="Delete"
          color="red"
        />
      </div>
    </Card>
  );
};
