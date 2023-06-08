import Head from 'next/head';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import EditForm from '@/content/Management/Children/EditChildrenForm';
import PageHeaderHistoryPost from '@/content/Management/Children/PageHeaderHistory';
import SidebarLayout from '@/layouts/SidebarLayout';

function HistoryPost() {
  return (
    <>
      <Head>
        <title>Children History Posyandu</title>
      </Head>
      <PageTitleWrapper>
        <PageHeaderHistoryPost />
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

HistoryPost.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default HistoryPost;
