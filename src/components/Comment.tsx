import { EditIcon, HeartIcon, ReplyIcon, TrashIcon } from 'lucide-react';
import { CommentIcons } from './CommentIcons';
import { Card, CardContent } from './ui/card';
import { useCommentRenderStore } from '@/store/store';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

type CommentProps = {
  name: string;
  postId: number;
  body: string;
};

export const Comments = ({ name, postId, body }: CommentProps) => {
  const childComments = useCommentRenderStore((state) =>
    state.getReplies(postId)
  );

  console.log('the parent id is ', postId);
  console.log('the reply of this postId is', childComments);

  return (
    <>
      <Card className="border shadow-sm rounded-md mt-4 p-2 bg-slate-50 dark:bg-slate-950 dark:border ">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-bold">{name}</span>
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
      {childComments?.length !== 0 &&
        childComments?.map((comment) => (
          <div className="flex justify-end" key={comment.id}>
            <Card className="ml-4 w-full border shadow-sm rounded-md mt-4 p-2 bg-slate-50 dark:bg-slate-950 dark:border ">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-bold">
                  {comment.name}
                </span>
                <span className="text-muted-foreground text-sm">
                  {dateFormatter.format(new Date())}
                </span>
              </div>
              <CardContent className="p-4">
                <div className="">{comment.body}</div>
              </CardContent>
              <div className="flex gap-2 ">
                <CommentIcons
                  icon={<HeartIcon className="w-5" />}
                  aria-label="Like"
                >
                  2
                </CommentIcons>

                <CommentIcons
                  icon={<ReplyIcon className="w-5" />}
                  aria-label="Reply"
                />
                <CommentIcons
                  icon={<EditIcon className="w-5" />}
                  aria-label="Edit"
                />
                <CommentIcons
                  icon={<TrashIcon className="w-5" />}
                  aria-label="Delete"
                  color="red"
                />
              </div>
            </Card>
          </div>
        ))}
    </>
  );
};
