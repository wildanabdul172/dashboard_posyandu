export type UsersStatus = 'posted' | 'deleted';

export interface UsersListModel {
  id: string;
  author: string;
  title: string;
  content: string;
  create: number;
  image: string;
  status: UsersStatus;
}
