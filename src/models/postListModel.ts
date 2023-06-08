export type PostedStatus = 'posted' | 'deleted';

export interface PostListModel {
  id: string;
  author: string;
  title: string;
  content: string;
  create_at: number;
  image: string;
  status: PostedStatus;
}
