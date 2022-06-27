import type { AppProps } from "next/app"
import React from "react";
import { Provider } from "react-redux";

import { wrapper } from "~/redux/store";
import "../styles/globals.css";

function App({ Component, ...restProps }: AppProps) {
    const { store } = wrapper.useWrappedStore(restProps);

    return (
      <Provider store={store}>
        <Component {...restProps.pageProps} />
      </Provider>
  );
}

export default App;
