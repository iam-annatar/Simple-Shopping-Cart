import { create } from 'zustand';
import users from '@/data/user.json';

type User = (typeof users)[number];

type CommentRenderType = {
  users: User[];
  getUser: (id: number) => User | undefined;
};

export const useCommentRenderStore = create<CommentRenderType>(() => ({
  users: [],
  getUser: (id: number) => {
    if (id == null) return;
    return users.find((user) => user.postId === id);
  },
}));

// type CommentLikeType = {
//   count: number;
//   addCount: () => void;
//   removeCount: () => void;
// };

// export const useCommentLikeStore = create<CommentLikeType>((set) => ({
//   count: 0,
//   addCount: () => set((state) => ({ count: state.count + 1 })),
//   removeCount: () => set((state) => ({ count: state.count - 1 })),
// }));
