import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { AragonSDKWrapper } from './AragonContext';

export function AragonProvider({ children }: { children: ReactNode | false }): JSX.Element {
  return (
    <AragonSDKWrapper>
      <QueryClientProvider client={new QueryClient()}>
        <>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      </QueryClientProvider>
    </AragonSDKWrapper>
  );
}
