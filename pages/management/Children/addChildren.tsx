import Head from 'next/head';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import SidebarLayout from '@/layouts/SidebarLayout';
import AddForm from '@/content/Management/Children/AddChildrenForm';
import PageHeaderPost from '@/content/Management/Children/PageHeader';

function AddPost() {
  return (
    <>
      <Head>
        <title>Add Children Posyandu</title>
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
            <AddForm/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

AddPost.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default AddPost;
