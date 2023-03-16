import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MantineProvider } from '@mantine/core';
import { createClient, WagmiConfig } from 'wagmi';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { AragonProvider } from 'use-aragon';
import { goerli } from 'wagmi/chains';

// const alchemyId = process.env.ALCHEMY_ID;

const client = createClient(
  getDefaultClient({
    appName: 'Your App Name',
    alchemyId: '',
    chains: [goerli],
  })
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <AragonProvider client={client}>
        <ConnectKitProvider>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'dark',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <App />
          </MantineProvider>
        </ConnectKitProvider>
      </AragonProvider>
    </WagmiConfig>
  </React.StrictMode>
);
