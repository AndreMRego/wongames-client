import NextNProgress from 'nextjs-progressbar';

import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo.config';

import { Provider as AuthProvider } from 'next-auth/client';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { CartProvider } from 'hooks/use-cart';
import { WishlistProvider } from 'hooks/use-wishlist';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import GlobalStyles from 'styles/global';
import theme from 'styles/theme';
import { useApollo } from 'utils/apollo';

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState, null);

  return (
    <AuthProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CartProvider>
            <WishlistProvider>
              <Head>
                <title>Won Games</title>
                <link rel="shortcut icon" href="/img/icon-512.png" />
                <link rel="apple-touch-icon" href="/img/icon-512.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta
                  name="description"
                  content="The best Game Stores in the world!"
                />
              </Head>
              <DefaultSeo {...SEO} />
              <GlobalStyles />
              <NextNProgress
                color="#F231A5"
                startPosition={0.3}
                stopDelayMs={200}
                height={5}
              />
              <Component {...pageProps} />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>{' '}
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
