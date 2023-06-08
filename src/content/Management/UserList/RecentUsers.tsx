import { UsersListModel } from '@/models/userListModel';
import { Card } from '@mui/material';
import RecentUsersTable from './RecentUsersTable';

export const getServerSideProps = async () => {
  const url = "http://localhost:4400"
  const res = await fetch(`${url}/api/master-data/tbl-article`)
  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}

function RecentPost(props) {
  const userListModel: UsersListModel[] = [
    props
  ];

  return (
    <Card>
      <RecentUsersTable usersList={userListModel} />
    </Card>
  );
}

export default RecentPost;
