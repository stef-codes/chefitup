import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Generate a vegan recipe in seconds."
          />
          <meta property="og:site_name" content="chefitup.app" />
          <meta
            property="og:description"
            content="Get your next vegan recipe."
          />
          <meta property="og:title" content="Vegan Recipe Generator" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Vegan Recipe Generator" />
          <meta
            name="twitter:description"
            content="Generate your next vegan recipe in seconds."
          />
          {/* <meta
            property="og:image"
            content="https://chefitup.app.com/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://chefitup.app.com/og-image.png"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
