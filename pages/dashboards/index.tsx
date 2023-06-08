import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Dashboards/Tasks/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import TasksAnalytics from '@/content/Dashboards/Tasks/TasksAnalytics';
import { Container, Grid } from '@mui/material';



function DashboardTasks() {
  return (
    <>
      <Head>
        <title>Tasks Dashboard</title>
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
            <TasksAnalytics/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
