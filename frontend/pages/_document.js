import React from "react";
import { Html, Head as NextHead, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <NextHead>
        <title>DU Capstone</title>
        <meta
          name="description"
          content="Capstone project for Digital University Dev Team"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </NextHead>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
