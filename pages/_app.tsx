import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../shared/store';
import Layout from '../components/layout/layout';
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Search from '../components/search/search';
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Search />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
