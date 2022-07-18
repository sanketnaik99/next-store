import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout/Layout";
import Commerce from "@chec/commerce.js";
import { Provider } from "react-redux";
import { store } from "../ducks";
import { useEffect } from "react";

export const commerce = new Commerce(
  `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`
);

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    console.log("IS LOGGED IN", commerce.customer.isLoggedIn());
    console.log("About", commerce.customer.about());
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
