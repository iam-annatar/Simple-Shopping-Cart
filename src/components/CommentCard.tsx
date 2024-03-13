import { EditIcon, HeartIcon, ReplyIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { useCommentStore } from "@/store/CommentStore";

import { CommentIcons } from "./CommentIcons";
import { EditForm } from "./EditForm";
import { ReplyForm } from "./ReplyForm";
import { Card, CardContent } from "./ui/card";

interface CommentCardProps {
  postId: number;
  body: string;
  userName?: string;
  name: string;
  parentId: number;
  id: number;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export const CommentCard = ({
  postId,
  id,
  body,
  name,
  userName,
  parentId,
}: CommentCardProps) => {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isReplyActive, setIsReplyAcive] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditActive, setIsEditActive] = useState(false);

  const removeComment = useCommentStore((state) => state.removeComment);
  const countLikes = useCommentStore((state) => state.countLikes);
  const likes = useCommentStore((state) => state.likes);
  const toggleLike = useCommentStore((state) => state.toggleLike);

  const isLiked = likes.some((like) => like.id === id);
  const count = countLikes(likes, id);

  const editHandler = () => {
    if (!isEditOpen && !isReplyOpen) {
      setIsEditOpen(true);
      setIsEditActive(true);
    } else {
      setIsEditOpen(false);
      setIsEditActive(false);
    }
  };

  const replyHandler = () => {
    if (!isReplyOpen && !isEditOpen) {
      setIsReplyOpen(true);
      setIsReplyAcive(true);
    } else {
      setIsReplyOpen(false);
      setIsReplyAcive(false);
    }
  };

  return (
    <div className="flex-1">
      <Card className="mt-4 w-full rounded-md border bg-slate-50 p-2 shadow-sm dark:border dark:bg-slate-950 ">
        <div className="items-center justify-between 2xs:flex">
          <div className="flex  items-center gap-2">
            <span className="font-bold text-muted-foreground">{name} </span>
            <span
              className={twMerge(
                userName == null && "hidden",
                "text-sm font-normal text-muted-foreground sm:ml-4",
              )}
            >
              Reply to
            </span>
            <span
              className={twMerge(
                userName == null && "hidden",
                "cursor-pointer font-normal text-blue-500",
              )}
            >
              {`@${userName}`}
            </span>
          </div>
          <span className="text-sm text-muted-foreground ">
            {dateFormatter.format(new Date())}
          </span>
        </div>
        <CardContent className="p-4">
          <div>{body}</div>
        </CardContent>
        <div className="flex gap-2 ">
          <CommentIcons
            icon={
              <HeartIcon
                onClick={() => {
                  toggleLike(id);
                  countLikes(likes, id);
                }}
                className={twMerge(
                  "w-5 heart-bg cursor-pointer duration-300 transition-all",
                  isLiked ? "like-pulse fill-red-500 text-red-500" : "",
                )}
              />
            }
            aria-label="Like"
          >
            {count}
          </CommentIcons>

          <CommentIcons
            isActive={isReplyActive}
            icon={<ReplyIcon onClick={replyHandler} className="w-5" />}
            aria-label="Reply"
          />
          <CommentIcons
            isActive={isEditActive}
            icon={<EditIcon onClick={editHandler} className="w-5" />}
            aria-label="Edit"
          />
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
      <div className={twMerge(isReplyOpen || isEditOpen ? "mt-4" : "")}>
        {isReplyOpen ? (
          <ReplyForm
            id={id}
            postId={postId}
            autoFocus
            userName={name}
            onClose={() => {
              setIsReplyOpen(false);
              setIsReplyAcive(false);
            }}
          />
        ) : null}
        {isEditOpen ? (
          <EditForm
            id={id}
            body={body}
            name={name}
            onClose={() => {
              setIsEditOpen(false);
              setIsEditActive(false);
            }}
            autoFocus
          />
        ) : null}
      </div>
    </div>
  );
};
