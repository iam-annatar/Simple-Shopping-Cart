import { create } from "zustand";

import comments from "@/data/user.json";

export interface Comment {
  postId?: number;
  parentId: number;
  name: string;
  body: string;
  replies: {
    postId?: number;
    parentId: number;
    id?: number;
    body: string;
    name: string;
    replies: Comment["replies"];
  }[];
}

interface CommentType {
  comments: Comment[];
  getComments: (id: number) => Comment | undefined;
  getReplies: (
    commentsReplies: Comment[],
    parentId: number | null,
    id: number,
  ) => Comment[];
  addComment: (comment: Comment) => void;
  removeComment: (id: number) => void;
}

// function for getting the replies recursively
const getRepliesRecursive = (
  commentsReplies: Comment[],
  parentId: number,
  id: number,
): Comment[] => {
  const replies = [];

  // eslint-disable-next-line fp/no-loops
  for (const comment of commentsReplies) {
    if (comment.parentId === parentId) {
      replies.push(comment);
      if (comment.replies)
        replies.push(...getRepliesRecursive(comment.replies, parentId, id));
    }
  }

  const rep = replies.map((r) => r.replies).filter((r) => r !== undefined);

  return rep.flat().filter((r) => r?.id === parentId);
};

// function for recursively removing the comments
const removeRecursive = (commentsArr: Comment[], parentId: number) => {
  return commentsArr.filter((c) => {
    if (c.parentId === parentId) {
      return false;
    } else {
      c.replies = removeRecursive(c.replies, parentId);
      return true;
    }
  });
};

export const useCommentStore = create<CommentType>((set) => ({
  comments,
  getComments: (id) => {
    if (id == null) return;
    return comments.find((comment) => comment.postId === id);
  },
  getReplies: (commentsReplies, parentId, id) => {
    if (parentId == null || id === null) return [];
    return getRepliesRecursive(commentsReplies, parentId, id);
  },
  addComment: (comment) => {
    if (comment.body.length >= 2) {
      set((state) => ({
        ...state,
        comments: [comment, ...state.comments],
      }));
    }
  },
  removeComment: (id) => {
    set((state) => ({
      comments: removeRecursive(state.comments, id),
    }));
  },
}));
