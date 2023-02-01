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
      <div id="app-root">
        <ApolloProvider client={client}>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </ApolloProvider>
      </div>
    </>
  );
};

export default App;
