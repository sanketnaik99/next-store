import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout/Layout";
import Commerce from "@chec/commerce.js";
import { Provider } from "react-redux";
import { store } from "../ducks";
import { useEffect } from "react";
import { getCustomerError, getCustomerSuccess } from "../ducks/user";
import { User } from "../ducks/user/types";
import { CacheProvider, EmotionCache } from "@emotion/react";
import Head from "next/head";
import createEmotionCache from "../createEmotionCache";

export const commerce = new Commerce(
  `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`
);

interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const clientSideEmotionCache = createEmotionCache();

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: CustomAppProps) => {
  useEffect(() => {
    if (commerce.customer.isLoggedIn()) {
      commerce.customer
        .about()
        .then((res) => {
          const user: User = {
            email: res.email,
            firstName: res.firstname,
            lastName: res.lastname,
          };
          store.dispatch(getCustomerSuccess(user));
        })
        .catch((error: any) => {
          store.dispatch(getCustomerError(error?.data?.error?.message));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </CacheProvider>
  );
};

export default MyApp;
