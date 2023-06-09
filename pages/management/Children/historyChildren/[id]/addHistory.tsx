import Head from 'next/head';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import SidebarLayout from '@/layouts/SidebarLayout';
import AddForm from '@/content/Management/Children/AddHistoryForm';
import PageHeaderHistoryPost from '@/content/Management/Children/PageHeaderHistory';
import { useRouter } from 'next/router';

function AddPost() {
  const { id } = useRouter().query;
  console.log(id)
  return (
    <>
      <Head>
        <title>Add History Children Posyandu</title>
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
