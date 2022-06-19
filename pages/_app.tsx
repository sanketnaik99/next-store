import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout/Layout";
import Commerce from "@chec/commerce.js";

export const commerce = new Commerce(
  `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
