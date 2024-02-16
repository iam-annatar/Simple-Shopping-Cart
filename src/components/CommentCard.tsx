import { EditIcon, HeartIcon, ReplyIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

import { useCommentStore } from "@/store/store";

import { CommentIcons } from "./CommentIcons";
import { ReplyForm } from "./ReplyForm";
import { Card, CardContent } from "./ui/card";

interface CommentCardProps {
  // postId?: number;
  body: string;
  userName?: string;
  name: string;
  parentId: number;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export const CommentCard = ({
  // postId,
  body,
  name,
  userName,
  parentId,
}: CommentCardProps) => {
  const removeComment = useCommentStore((state) => state.removeComment);
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsAcive] = useState(false);

  const ReplyHandler = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsAcive(true);
    } else {
      setIsOpen(false);
      setIsAcive(false);
    }
  };

  return (
    <div className="flex-1">
      <Card className="mt-4 w-full rounded-md border bg-slate-50 p-2 shadow-sm dark:border dark:bg-slate-950 ">
        <div className="items-center justify-between 2xs:flex">
          <div className="flex  items-center gap-2">
            <span className="font-bold text-muted-foreground">{name} </span>
            <span
              className={`   ${
                userName == null && "hidden"
              } text-sm font-normal text-muted-foreground sm:ml-4 `}
            >
              Reply to
            </span>
            <span
              className={`${
                userName == null && "hidden"
              } cursor-pointer font-normal text-blue-500`}
            >
              {`@${userName}`}
            </span>
          </div>
          <span className="text-sm text-muted-foreground ">
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
            isActive={isActive}
            icon={<ReplyIcon onClick={ReplyHandler} className="w-5" />}
            aria-label="Reply"
          />
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
      <div className={`${isOpen && "mt-4"}`}>
        {isOpen ? (
          <ReplyForm
            autoFocus
            userName={name}
            onClose={() => {
              setIsOpen(false);
              setIsAcive(false);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
