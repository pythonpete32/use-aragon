export enum DepositERC20Status {
  IDLE = 'idle',
  WAITING_FOR_SIGNER = 'waitingForSigner',
  CHECKING_ALLOWANCE = 'checkingAllowance',
  CONFIRMING_ALLOWANCE_UPDATE = 'confirmingAllowanceUpdate',
  CONFIRMING_DEPOSIT = 'confirmingDeposit',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface DepositERC20State {
  allowance: bigint | null;
  updateAllowanceTxid: string | null;
  depositTxid: string | null;
  depositStatus: DepositERC20Status;
}
