import axios from 'axios';

export async function getArticle() {
    const ROOT_API = process.env.NEXT_PUBLIC_API;

    const response = await axios.get(`${ROOT_API}/api/master-data/tbl-article`);
    const axiosResponse = response.data;

    return axiosResponse.data;
}