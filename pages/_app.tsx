import { ReactElement, ReactNode, useEffect } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from 'src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'src/createEmotionCache';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import router from 'next/router';
import axios from 'axios';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface TokyoAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function TokyoApp(props: TokyoAppProps) {
  useEffect(() => {
    const saveLastVisitedPage = () => {
      sessionStorage.setItem('lastVisitedPage', router.pathname);
    };

    const getLastVisitedPage = () => {
      return sessionStorage.getItem('lastVisitedPage');
    };

    const isLoggedIn = () => {
      const userData = localStorage.getItem('userData');
      return !!userData;
    };

    const checkTokenValidity = async () => {
      const userData = localStorage.getItem('userData');
      if (!userData) {
        // Tidak ada data pengguna, lakukan tindakan yang sesuai (misalnya, redirect ke halaman login)
        router.push('/');
        return;
      }
      const token = JSON.parse(userData).token;
      if (token) {
        try {
          await axios.get('http://localhost:4400/api/auth/check-token', {
            headers: {
              Authorization: token
            }
          });
        } catch (error) {
          if (error.response && error.response.status === 401) {
            // Token tidak valid, lakukan tindakan yang sesuai
            localStorage.removeItem('userData');
            router.replace('/');
          }
        }
      }
    };

    const componentDidMount = async () => {
      if (isLoggedIn()) {
        const lastVisitedPage = getLastVisitedPage();
        if (lastVisitedPage) {
          router.replace(lastVisitedPage);
        } else {
          // Jika belum ada halaman terakhir yang tersimpan, arahkan ke halaman awal
          router.replace('/dashboards');
        }
      } else {
        router.replace('/');
      }

      // Cek validitas token saat komponen dimuat
      await checkTokenValidity();

      window.addEventListener('beforeunload', saveLastVisitedPage);
    };

    componentDidMount();

    return () => {
      window.removeEventListener('beforeunload', saveLastVisitedPage);
    };
  }, []);

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Posyandu Dashboard</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <SidebarProvider>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </LocalizationProvider>
        </ThemeProvider>
      </SidebarProvider>
    </CacheProvider>
  );
}

export default TokyoApp;
