import Head from 'next/head';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import EditForm from '@/content/Management/Schedule/EditScheduleForm';
import PageHeaderPost from '@/content/Management/Schedule/PageHeader';
import SidebarLayout from '@/layouts/SidebarLayout';

function EditPost() {
  return (
    <>
      <Head>
        <title>Edit Schedule Posyandu</title>
      </Head>
      <PageTitleWrapper>
        <PageHeaderPost />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <EditForm/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

EditPost.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default EditPost;
