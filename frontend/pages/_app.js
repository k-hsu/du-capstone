import React from "react";
import { Global, css } from "@emotion/react";
import { globalStyles } from "../theme";
import "../styles/global.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Global
        styles={css`
          ${globalStyles}
        `}
      />
      <Component {...pageProps} />
    </>
  );
};

export default App;
