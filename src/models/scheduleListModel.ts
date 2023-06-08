export type PostedStatus = 'posted' | 'deleted';

export interface ScheduleListModel {
  activity_id: string;
  activity_name: string;
  activity_date: Date;
  activity_time: String;
  activity_location: string;
  status: PostedStatus;
}
