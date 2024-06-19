import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      {googleAnalyticsId && <Analytics />}
    </>
  );
}

export default MyApp;
