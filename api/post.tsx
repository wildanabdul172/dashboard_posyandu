import { InferGetServerSidePropsType } from 'next/'

type Data = {  }

export const getServerSideProps = async () => {
  const url = "http://localhost:4400"
  const res = await fetch(`${url}/api/master-data/tbl-article`)
  const data: Data = await res.json()

  return {
    props: {
      data,
    },
  }
}

function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // will resolve posts to type Data
}

export default Page