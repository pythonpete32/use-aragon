<h1 align="center">useAragon 🦅</h1>

<h2 align="center">React Hooks for Aragon OSx</h2>

<p align="center">
  <a href="https://reactjs.org/">React</a> 🤝 <a href="https://www.aragon.org">Aragon OSx</a>
</p>

**Standing on the shoulders of these chads (aka, dependencies):**

- [Aragon SDK](https://github.com/aragon/sdk/)
- [reactQuery](https://react-query-v3.tanstack.com/)
- [ethers](https://docs.ethers.io/v5/)
- [wagmi](https://wagmi.sh/)

**Jump straight to the [Hooks Reference](#hooks-reference)**

# Motivation

`useAragon` is a library of React hooks that make it easy to integrate your Aragon OSx DAO directly into your dApps UI. Using the useAragon library, developers can easily create highly performant and responsive web applications that interact with Aragon DAOs, without having to worry about the intricacies of interacting with the contracts.

The Aragon SDK abstract away much of the complexity of interacting with the Aragon protocol, useAragon further simplifies the process by providing a set of hooks that encapsulate common interactions, managing state, caching, deduping, lazy loading, dev tools, and a bunch more optimizations. All with typescript niceness sprinkled in

# Example

```typescript
const { daos, isLoading, isError } = useFetchDaos();

const { dao } = useFetchDao("aragon.dao.eth");

const { members } = useFetchMembers(votingAddress);

const { votes } = useFetchVotes(votingAddress, {
  onSuccess: (data) => console.log(data),
  onError: (error) => console.log(error),
});
```

# Installation

```bash
# npm
npm install --save useAragon

# yarn
yarn add useAragon

# pnpm
pnpm add useAragon
```

# Usage

## Basic

1. Your app must first be wrapped in a Wagmi context and a Aragon context

```typescript
function App() {
  return (
    <WagmiConfig client={client}>
      <AragonProvider>
        <DApp />
      </AragonProvider>
    </WagmiConfig>
  );
}
```

2. You can then use the Lens hooks in any components inside of your DApp component:

```typescript
import { useFetchDao } from "useAragon";

// ...

const { data: dao } = useFetchDao("aragon.dao.eth");
```

3. The return value of any Fetch hook is...

4. The return value of any Mutation hook (e.g. `useDepositEth`) is....

Full API specification is below in the [hooks](#hooks) section.

## Advanced

# Hooks Reference

- [Query](#Query)
  - [useFetchDao](#useFetchDao)
  - [useFetchDaos](#useFetchDaos)
  - [useFetchDaoBalances](#useFetchDaoBalances)
  - [useFetchTransfers](#useFetchTransfers)
- [Write](#Write)

## Query

### useFetchDao

_[Aragon Reference](https://github.com/aragon/sdk/blob/develop/modules/client/examples/00-client/06-get-dao.ts)_

Get information in an individual DAO

#### Usage

```typescript
import { useFetchDao } from "useAragon";

const daoAddressOrEns = "aragon.dao.eth";

function App() {
  const { dao, isLoading, isError } = useFetchDao(daoAddressOrEns, options);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;
  return <pre>{JSON.Stringify(dao, null, 2)}</pre>;
}
```

#### Return type

```typescript
type DaoDetails = {
  address: string;
  ensDomain: string;
  metadata: DaoMetadata;
  creationDate: Date;
  plugins: InstalledPluginListItem[];
};
```

#### Options

```typescript
type Options = {
  enabled?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onSettled?: (data: any, error: any) => void;
};
```

### useFetchDaos

### useFetchDaoBalances

### useFetchTransfersuseFetchTransfers

_Made with 🔥 by [AbuUsama](https://twitter.com/AaronAbuUsama)_
