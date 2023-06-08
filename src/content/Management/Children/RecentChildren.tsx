import { Card } from '@mui/material';
import { ChildrenListModel } from '@/models/childrenListModel';
import RecentChildrenTable from './RecentChildrenTable';

function RecentPost(props) {
  const childrenListModel: ChildrenListModel[] = [props];
  return (
    <Card>
      <RecentChildrenTable childrenList={childrenListModel} />
    </Card>
  );
}

export default RecentPost;
