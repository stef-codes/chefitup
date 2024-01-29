import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <GoogleAnalytics trackPageViews />
    </>
  );
}

export default MyApp;
