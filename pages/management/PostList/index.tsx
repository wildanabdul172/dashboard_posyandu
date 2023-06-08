import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/PostList/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import RecentPost from '@/content/Management/PostList/RecentPost';

function PostList() {
  return (
    <>
      <Head>
        <title>Post List OtsukaGo</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
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
            <RecentPost />
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
