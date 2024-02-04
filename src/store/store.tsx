import { create } from 'zustand';
import comments from '@/data/user.json';

// type Comment = {
//   postId: number;
//   name: string;
//   email: string;
//   body: string;
//   replies?: Comment[];
// };

// type CommentRenderType = {
//   comments: Comment[];
//   getUser: (id: number) => Comment | undefined;
//   addReply: (parentId: number, reply: Comment) => void;
//   getReplies: (parentId: number) => Comment[];
// };

// export const useCommentRenderStore = create<CommentRenderType>((set) => ({
//   comments: [],
//   getUser: (id: number) => {
//     if (id == null) return;
//     return comments.find((user) => user.postId === id);
//   },
//   addReply: (parentId, reply) =>
//     set((state) => {
//       const addReplyToComment = (comments: Comment[]): Comment[] =>
//         comments.map((comment) => ({
//           ...comment,
//           replies:
//             comment.postId === parentId
//               ? [...comment.replies, reply]
//               : addReplyToComment(comment.replies),
//         }));
//     }),
//   getReplies: (parentId) => {
//     set((state) => {
//       return state.comments.find((c) => c.postId === parentId)?.replies || [];
//     });
//   },
// }));

type Comment = {
  postId: number;
  name: string;
  email: string;
  body: string;
  replies: {
    id: number;
    name: string;
    email: string;
    body: string;
  }[];
};

type CommentRenderType = {
  comments: Comment[];
  getComments: (id: number) => Comment | undefined;
  getReplies: (parentId: number, id: number) => Comment['replies'] | undefined;
};

export const useCommentRenderStore = create<CommentRenderType>(() => ({
  comments: [],
  getComments: (id) => {
    if (id == null) return;
    return comments.find((comment) => comment.postId === id);
  },
  getReplies: (parentId, id) => {
    if (parentId == null) return;
    return comments
      .filter((comment) => comment.postId === parentId)
      .map((comment) => comment.replies)
      .flat()
      .filter((c) => c.id === id);
  },
}));
