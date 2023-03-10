import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { WagmiConfig, createClient, configureChains, goerli } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { AragonSDKWrapper } from './AragonContext';
const { provider, webSocketProvider } = configureChains([goerli], [publicProvider()]);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

export function AragonProvider({ children }: { children: ReactNode | false }): JSX.Element {
  return (
    <WagmiConfig client={client}>
      <AragonSDKWrapper>
        <QueryClientProvider client={new QueryClient()}>
          <>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </>
        </QueryClientProvider>
      </AragonSDKWrapper>
    </WagmiConfig>
  );
}
