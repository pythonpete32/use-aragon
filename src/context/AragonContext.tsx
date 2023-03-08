import React from 'react';
import {
  Client,
  Context,
  ContextParams,
  ContextPlugin,
  TokenVotingClient,
} from '@aragon/sdk-client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSigner } from 'wagmi';

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
  const [currentDao, setCurrentDao] = useState<string | undefined>(
    '0x3d359409d2468901f12fd93a32c3f27c0004a108'
  );

  const signer = useSigner().data ?? undefined;

  useEffect(() => {
    const aragonSDKContextParams: ContextParams = {
      network: 'goerli',
      signer,
      web3Providers: ['https://rpc.ankr.com/eth_goerli'],
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
          url:
            'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mainnet/version/v1.0.0/api', // "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-goerli/version/v1.0.0/api", // url: "https://subgraph.satsuma-prod.com/aragon/core-goerli-2/api",
        },
      ],
    };
    const context = new Context(aragonSDKContextParams);
    const contextPlugin: ContextPlugin = ContextPlugin.fromContext(context);
    setContext(context);
    setBaseClient(new Client(context));
    setTokenVotingClient(new TokenVotingClient(contextPlugin));
  }, [signer]);

  return (
    <AragonSDKContext.Provider
      value={{
        context,
        baseClient,
        tokenVotingClient,
        currentDao,
        setCurrentDao,
      }}
    >
      {children}
    </AragonSDKContext.Provider>
  );
}

export function useAragon(): any {
  return useContext(AragonSDKContext);
}
