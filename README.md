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

const { dao } = useFetchDao('aragon.dao.eth');

const { members } = useFetchMembers(votingAddress);

const { votes } = useFetchVotes(votingAddress, {
  onSuccess: data => console.log(data),
  onError: error => console.log(error),
});
```

# Installation

```bash
# pnpm
pnpm add use-aragon
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

2. You can then use the hooks in any components inside of your DApp component:

```typescript
import { useFetchDao } from 'useAragon';

// ...

const { data: dao } = useFetchDao('aragon.dao.eth');
```

# Development

The recommended workflow is to run TSDX in one terminal:

```bash
pnpm start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example
pnpm i
pnpm start
```

The example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, we use [Parcel's aliasing](https://parceljs.org/module_resolution.html#aliases).

To do a one-off build, use `pnpm run build` or `yarn build`.

To run tests, use `pnpm test` or `yarn test`.

### Bundle analysis

Calculate the real cost with `pnpm run size` and visulize it with `pnpm run analyze`.

_Made with 🔥 by [AbuUsama](https://twitter.com/AaronAbuUsama)_
