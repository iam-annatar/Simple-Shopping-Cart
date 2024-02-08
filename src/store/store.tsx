import { create } from 'zustand';
import comments from '@/data/user.json';

type Comment = {
  postId?: number;
  parentId?: number | null;
  name: string;
  body: string;
  id?: number;
  replies?: Comment[];
};

type CommentRenderType = {
  comments: Comment[];
  getComments: (id: number) => Comment | undefined;
  getReplies: (
    comments: Comment[],
    parentId: number | null,
    id: number
  ) => Comment[];
};

const getRepliesRecursive = (
  comments: Comment[],
  parentId: number | null,
  id: number
): Comment[] => {
  const replies = [];
  for (const comment of comments) {
    if (comment.parentId === parentId) {
      replies.push(comment);
      if (comment.replies)
        replies.push(...getRepliesRecursive(comment.replies, parentId, id));
    }
  }

  const rep = replies.map((r) => r.replies).filter((r) => r !== undefined);

  return rep
    .flat()
    .filter((r) => r?.id === parentId)
    .filter((r): r is Comment => r !== undefined);
};

export const useCommentRenderStore = create<CommentRenderType>(() => ({
  comments: [],
  getComments: (id) => {
    if (id == null) return;
    return comments.find((comment) => comment.postId === id);
  },
  getReplies: (comments, parentId, id) => {
    if (parentId == null) return [];
    return getRepliesRecursive(comments, parentId, id);
  },
}));
