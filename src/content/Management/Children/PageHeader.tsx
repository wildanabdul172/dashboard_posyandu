import { Typography, Button, Grid } from '@mui/material';
import NextLink from 'next/link';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeaderPost() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Pengolahan Data Anak Posyandu
        </Typography>
      </Grid>
      <Grid item>
      <NextLink href="/management/Children/addChildren" passHref>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Tambah Data Anak
        </Button>
      </NextLink>
      </Grid>
    </Grid>
  );
}

export default PageHeaderPost;
