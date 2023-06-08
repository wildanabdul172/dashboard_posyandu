import { PostListModel } from '@/models/postListModel';
import { Card } from '@mui/material';
import RecentPostTable from './RecentPostTable';

function RecentPost(props) {
  const postListModel: PostListModel[] = [props];
  return (
    <Card>
      <RecentPostTable postList={postListModel} />
    </Card>
  );
}

export default RecentPost;
