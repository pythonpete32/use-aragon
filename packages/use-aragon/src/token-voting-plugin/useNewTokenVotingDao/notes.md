```typescript
const pluginSettings = {
  votingSettings: {
    minDuration: 60 * 60 * 24 * 2, // seconds (minimum amount is 3600)
    minParticipation: 0.25, // 25%
    supportThreshold: 0.5, // 50%
    minProposerVotingPower: BigInt('5000'), // default 0
    votingMode: VotingMode.EARLY_EXECUTION, // default is STANDARD. other options: EARLY_EXECUTION, VOTE_REPLACEMENT
  },
  newToken: {
    name: 'Token', // the name of your token
    symbol: 'TOK', // the symbol for your token. shouldn't be more than 5 letters
    decimals: 18, // the number of decimals your token uses
    // minter: '0x...', // optional. if you don't define any, we'll use the standard OZ ERC20 contract. Otherwise, you can define your own token minter contract address.
    balances: [
      {
        // Defines the initial balances of the new token
        address: '0x47d80912400ef8f8224531EBEB1ce8f2ACf4b75a', // address of the account to receive the newly minted tokens
        balance: BigInt(10), // amount of tokens that address should receive
      },
    ],
  },
};

const daoSettings = {
  daoMetadata: {
    name: 'test',
    description: 'test',
    links: [],
  },
  ensSubdomain: 'use-aragon' + Math.floor(Math.random() * 1000),
};
```
