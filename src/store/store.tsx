import { create } from "zustand";

import comments from "@/data/user.json";

export interface Comment {
  postId?: number;
  parentId: number;
  id: number;
  name: string;
  body: string;
  replies: {
    postId?: number;
    parentId: number;
    id: number;
    body: string;
    name: string;
    replies: Comment["replies"];
  }[];
}

interface CommentType {
  comments: Comment[];
  getComments: (id: number) => Comment | undefined;
  addComment: (comment: Comment) => void;
  removeComment: (id: number) => void;
  updateReplies: (comments: Comment, id: number) => void;
}

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

  addComment: (comment) => {
    if (comment.body.length >= 2) {
      set((state) => ({
        comments: [comment, ...state.comments],
      }));
    }
  },
  removeComment: (id) => {
    set((state) => ({
      comments: removeRecursive(state.comments, id),
    }));
  },
  updateReplies: (comment, id) => {
    set((state) => {
      const updatedComment = state.comments.map((c) => {
        if (c.id === id) {
          c.replies = [...c.replies, comment];
        }

        return c;
      });
      return { comments: updatedComment };
    });
  },
}));
