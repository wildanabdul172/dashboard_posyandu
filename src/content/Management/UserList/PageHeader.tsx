import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeaderUser() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Users List OtsukaGo
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your recent users
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          href="/management/UserList/addUser"
        >
          Create user
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeaderUser;
