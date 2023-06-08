import Head from 'next/head';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import HistoryPage from '@/content/Management/Children/PageHistory';
import PageHeaderHistoryPost from '@/content/Management/Children/PageHeaderHistory';
import SidebarLayout from '@/layouts/SidebarLayout';
import TasksAnalytics from '@/content/Dashboards/Tasks/TasksAnalytics';

function HistoryChildren() {
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
            {/* <TasksAnalytics /> */}
            <HistoryPage />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

HistoryChildren.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default HistoryChildren;
