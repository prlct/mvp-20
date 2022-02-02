import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import PageConfig from './PageConfig';

import 'styles/globals.css';

const App = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        // TODO: get current user
      } catch (error) {
        // @todo: add something like sentry
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  if (loading) return null;

  return (
    <>
      <Head>
        <title>Ship</title>
      </Head>
      <PageConfig>
        <Component {...pageProps} />
      </PageConfig>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default App;
