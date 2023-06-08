import { Card } from '@mui/material';
import { ScheduleListModel } from '@/models/scheduleListModel';
import RecentScheduleTable from './RecentScheduleTable';

function RecentPost(props) {
  const scheduleListModel: ScheduleListModel[] = [props];
  return (
    <Card>
      <RecentScheduleTable scheduleList={scheduleListModel} />
    </Card>
  );
}

export default RecentPost;
