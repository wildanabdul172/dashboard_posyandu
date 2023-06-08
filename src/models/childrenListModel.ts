export type PostedStatus = 'posted' | 'deleted';

export interface ChildrenListModel {
  child_id: String;
  name: string;
  date_of_birth: Date;
  gender: 'Laki-Laki' | 'Perempuan';
  address: string;
  parent_phone_number: number;
  parent_name: string;
  user_id: number;
  status: PostedStatus;
}