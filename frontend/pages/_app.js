import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Global, css } from "@emotion/react";
import getConfig from "next/config";
import ToastProvider from "../providers/ToastProvider/ToastProvider";
import { globalStyles } from "../theme";
import "../styles/global.css";

const App = ({ Component, pageProps }) => {
  const {
    publicRuntimeConfig: { apiUrl },
  } = getConfig();

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: apiUrl,
  });
  return (
    <>
      <Global
        styles={css`
          ${globalStyles}
        `}
      />
      <ApolloProvider client={client}>
        <div id="app-root">
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </div>
      </ApolloProvider>
    </>
  );
};

export default App;
