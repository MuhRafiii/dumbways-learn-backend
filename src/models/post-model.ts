export interface Post {
  id: number;
  title: string;
  content: string;
}

export const posts: Post[] = [
  {
    id: 1,
    title: "Post pertama",
    content: "Ini adalah post pertama",
  },
  {
    id: 2,
    title: "Post kedua",
    content: "Ini adalah post kedua",
  },
];
