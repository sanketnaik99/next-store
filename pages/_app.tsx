import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout/Layout";
import Commerce from "@chec/commerce.js";
import { Provider } from "react-redux";
import { store } from "../ducks";

export const commerce = new Commerce(
  `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`
);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
