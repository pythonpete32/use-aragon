import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { chains, client } from "../constants/wagmi";
import { ColorModeScript } from "@chakra-ui/react";

import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter/variable.css";
import { theme } from "../theme";

import { AragonProvider } from "use-aragon";
import { MainLayout } from "../components/templates/MainLayout";
import { DrawerProvider } from "../components/providers/DrawProvider";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <AragonProvider>
          <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode="dark" />
            <DrawerProvider>
              <NextHead>
                <title>The DAO Box</title>
              </NextHead>

              {mounted && (
                <MainLayout>
                  <Component {...pageProps} />
                </MainLayout>
              )}
            </DrawerProvider>
          </ChakraProvider>
        </AragonProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
