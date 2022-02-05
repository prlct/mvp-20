import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { supabase } from 'utils/supabaseClient';

import PageConfig from './PageConfig';

import 'styles/globals.css';

const App = ({ Component, pageProps }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // add await
    // const { error } = supabase.auth.signOut();
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, fetchedSession) => {
      setSession(fetchedSession);
    });

    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <>
      <Head>
        <title>Ship</title>
      </Head>
      <PageConfig session={session}>
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
