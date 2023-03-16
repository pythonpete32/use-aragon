export enum VoteStatus {
  IDLE = 'idle',
  WAITING_FOR_SIGNER = 'waitingForSigner',
  CONFIRMING_TRANSACTION = 'confirmingTransaction',
  SUCCESS = 'success',
  ERROR = 'error',
}
