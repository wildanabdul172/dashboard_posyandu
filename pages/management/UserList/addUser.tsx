import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import AddUserForm from '@/content/Management/UserList/AddUserForm';
import PageHeaderUser from '@/content/Management/UserList/PageHeader';

function PostList() {
  return (
    <>
      <Head>
        <title>Add Post OtsukaGo</title>
      </Head>
      <PageTitleWrapper>
        <PageHeaderUser />
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
            <AddUserForm/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

PostList.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default PostList;
