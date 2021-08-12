import "reset-css";
import { Global, css } from "@emotion/react";
import { theme } from "../styles/theme";
import { ThemeProvider } from "@emotion/react";

const style = css`
  body {
    min-height: 100vh;
  }

  html {
    font-family: "Nunito", sans-serif;
    font-size: 10px;
    box-sizing: border-box;
    min-height: 100vh;
    background-color: #609ea1;
  }

  * {
    box-sizing: border-box;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global styles={style} />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
