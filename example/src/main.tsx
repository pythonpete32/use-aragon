import { ConnectKitProvider } from "connectkit";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";

import { AragonProvider } from "../../src/";
import { App } from "./App";
import { client } from "./wagmi";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <AragonProvider>
          <App />
        </AragonProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
