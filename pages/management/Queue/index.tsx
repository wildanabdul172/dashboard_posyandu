import Footer from "@/components/Footer";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageHeader from "@/content/Management/Queue/PageHeader";
import RecentPost from "@/content/Management/Queue/RecentChildren";
import SidebarLayout from "@/layouts/SidebarLayout";
import { Container, Grid } from "@mui/material";
import Head from "next/head";


function QueueList() {
  return (
    <>
      <Head>
        <title>Antrian Posyandu</title>
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

QueueList.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default QueueList;
