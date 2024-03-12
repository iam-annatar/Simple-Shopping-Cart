import type { ChangeEvent } from "react";
import { useState } from "react";

import { useCommentStore } from "@/store/CommentStore";

import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface EditFormProps {
  id: number;
  autoFocus: boolean;
  body: string;
  onClose: () => void;
  name: string;
}

export const EditForm = ({
  id,
  name,
  onClose,
  body,
  autoFocus,
}: EditFormProps) => {
  const [message, setMessage] = useState(body);
  const editComments = useCommentStore((state) => state.editComments);

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    editComments(message, id);
    onClose();
  };

  return (
    <Card className="mb-4 border-none bg-none px-4 shadow-none">
      <div className="flex items-center gap-2">
        <span className="font-bold text-muted-foreground">{name}</span>
      </div>

      <form id="comment" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <textarea
            placeholder="What are your thoughts?"
            className="mt-2 h-[10rem] grow resize-none rounded-sm border-2  bg-slate-50 p-[.5em] text-sm dark:bg-slate-950 "
            id="comment"
            autoFocus={autoFocus}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex gap-2">
            <Button
              onClick={onClose}
              size="sm"
              className="bg-red-500 text-base text-white hover:bg-red-600"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit"
              className="bg-blue-600 text-base text-white  hover:bg-blue-700 "
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};
