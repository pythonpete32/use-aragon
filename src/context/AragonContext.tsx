import React from 'react';
import {
  Client,
  Context,
  ContextParams,
  ContextPlugin,
  TokenVotingClient,
} from '@aragon/sdk-client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNetwork, useSigner } from 'wagmi';
import { SUBGRAPH_API_URL, WEB3_PROVIDER_URL } from '../constants';

interface AragonSDKWrapperContext {
  children: JSX.Element;
}

const AragonSDKContext = createContext({});

export function AragonSDKWrapper({ children }: AragonSDKWrapperContext): JSX.Element {
  const [context, setContext] = useState<Context | undefined>(undefined);
  const [baseClient, setBaseClient] = useState<Client | undefined>(undefined);
  const [tokenVotingClient, setTokenVotingClient] = useState<TokenVotingClient | undefined>(
    undefined
  );
  const { chain } = useNetwork();

  const signer = useSigner().data ?? undefined;

  useEffect(() => {
    const aragonSDKContextParams: ContextParams = {
      network: chain?.id || 1,
      signer,
      web3Providers: WEB3_PROVIDER_URL[chain?.id || 1],
      ipfsNodes: [
        {
          url: 'https://testing-ipfs-0.aragon.network/api/v0',
          headers: {
            'X-API-KEY': 'b477RhECf8s8sdM7XrkLBs2wHc4kCMwpbcFC55Kt',
          },
        },
      ],
      graphqlNodes: [
        {
          url: SUBGRAPH_API_URL[chain?.id || 1],
        },
      ],
    };
    const context = new Context(aragonSDKContextParams);
    const contextPlugin: ContextPlugin = ContextPlugin.fromContext(context);
    setContext(context);
    setBaseClient(new Client(context));
    setTokenVotingClient(new TokenVotingClient(contextPlugin));
  }, [signer, chain]);

  return (
    <AragonSDKContext.Provider
      value={{
        context,
        baseClient,
        tokenVotingClient,
      }}
    >
      {children}
    </AragonSDKContext.Provider>
  );
}

export function useAragon(): any {
  const context = useContext(AragonSDKContext);
  if (!context) throw new Error('useAragon hooks must be used within an AragonProvider');
  return context;
}
