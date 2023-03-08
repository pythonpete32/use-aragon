import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MantineProvider } from '@mantine/core';
import { WagmiConfig, createClient } from 'wagmi';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { AragonProvider } from 'use-aragon';
// const alchemyId = process.env.ALCHEMY_ID;

const client = createClient(
  getDefaultClient({
    appName: 'Your App Name',
    alchemyId: '',
  })
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <AragonProvider>
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
