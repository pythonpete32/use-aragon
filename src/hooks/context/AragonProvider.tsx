import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { AragonSDKWrapper } from "./aragonContext";

export function AragonProvider({ children }: { children: JSX.Element }): JSX.Element {
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
