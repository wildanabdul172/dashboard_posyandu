import { Typography, Button, Grid } from '@mui/material';
import NextLink from 'next/link';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useRouter } from 'next/router';

function PageHeaderHistoryPost() {
  const { id } = useRouter().query;
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Children History Posyandu
        </Typography>
      </Grid>
      <Grid item>
      <NextLink href={`/management/Children/historyChildren/${id}/addHistory`} passHref>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Add History
        </Button>
      </NextLink>
      </Grid>
    </Grid>
  );
}

export default PageHeaderHistoryPost;
