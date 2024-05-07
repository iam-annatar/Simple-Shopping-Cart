import { EditIcon, HeartIcon, ReplyIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import type { Comment } from "@/_features/Comments/store/CommentStore";
import { useCommentStore } from "@/_features/Comments/store/CommentStore";
import { Card, CardContent } from "@/components/ui/card";

import { CommentIcons } from "./CommentIcons";
import { EditForm } from "./EditForm";
import { ReplyForm } from "./ReplyForm";

interface CommentCardProps {
  comment: Comment;
  username?: string;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export const CommentCard = ({ comment, username }: CommentCardProps) => {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isReplyActive, setIsReplyAcive] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditActive, setIsEditActive] = useState(false);

  const removeComment = useCommentStore((state) => state.removeComment);
  const countLikes = useCommentStore((state) => state.countLikes);
  const likes = useCommentStore((state) => state.likes);
  const toggleLike = useCommentStore((state) => state.toggleLike);

  const isLiked = likes.some((like) => like.id === comment.id);
  const count = countLikes(likes, comment.id);

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
            <span className="font-bold text-muted-foreground">
              {comment.name}{" "}
            </span>
            <span
              className={twMerge(
                username == null && "hidden",
                "text-sm font-normal text-muted-foreground sm:ml-4",
              )}
            >
              Reply to
            </span>
            <span
              className={twMerge(
                username == null && "hidden",
                "cursor-pointer font-normal text-blue-500",
              )}
            >
              {`@${username}`}
            </span>
          </div>
          <span className="text-sm text-muted-foreground ">
            {dateFormatter.format(new Date())}
          </span>
        </div>
        <CardContent className="p-4">
          <div>{comment.body}</div>
        </CardContent>
        <div className="flex gap-2 ">
          <CommentIcons
            icon={
              <HeartIcon
                onClick={() => {
                  toggleLike(comment.id);
                  countLikes(likes, comment.id);
                }}
                className={twMerge(
                  "w-5 heart-bg cursor-pointer duration-300 transition-all ease-linear",
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
            icon={
              <ReplyIcon
                onClick={() => {
                  replyHandler();
                }}
                className="w-5"
              />
            }
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
                onClick={() => removeComment(comment.parentId)}
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
            id={comment.id}
            postId={comment.postId}
            autoFocus
            onClose={() => {
              setIsReplyOpen(false);
              setIsReplyAcive(false);
            }}
          />
        ) : null}
        {isEditOpen ? (
          <EditForm
            comment={comment}
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
