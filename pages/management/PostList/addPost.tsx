import Head from 'next/head';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import AddForm from '@/content/Management/PostList/AddPostForm';
import PageHeaderPost from '@/content/Management/PostList/PageHeader';
import SidebarLayout from '@/layouts/SidebarLayout';

function AddPost() {
  return (
    <>
      <Head>
        <title>Add Post OtsukaGo</title>
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
