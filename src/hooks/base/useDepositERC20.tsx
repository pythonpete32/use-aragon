/* eslint-disable @typescript-eslint/no-floating-promises */

import { DaoDepositSteps } from "@aragon/sdk-client";
import { useState } from "react";
import { useMutation } from "react-query";

import { useAragonSDKContext } from "../context";

export function useDepositERC20(depositParams: any, options?: any): any {
  const { baseClient: client } = useAragonSDKContext();
  const [txHash, setTxHash] = useState(null);
  const [approveTxHash, setApproveTxHash] = useState(null);
  const [allowance, setAllowance] = useState<BigInt | null>(null);
  const [amount, setAmount] = useState<BigInt | null>(null);

  const deposit = async (): Promise<BigInt | null> => {
    const steps = client.methods.deposit(depositParams);

    for await (const step of steps) {
      switch (step.key) {
        case DaoDepositSteps.CHECKED_ALLOWANCE:
          console.log(step.allowance); // 0n
          setAllowance(step.allowance);
          break;
        case DaoDepositSteps.UPDATING_ALLOWANCE:
          console.log(step.txHash); // 0xb1c14a49...3e8620b0f5832d61c
          setApproveTxHash(step.txHash);
          break;
        case DaoDepositSteps.UPDATED_ALLOWANCE:
          console.log(step.allowance); // 10n
          setAllowance(step.allowance);
          break;
        case DaoDepositSteps.DEPOSITING:
          console.log(step.txHash); // 0xb1c14a49...3e8620b0f5832d61c
          setTxHash(step.txHash);
          break;
        case DaoDepositSteps.DONE:
          console.log(step.amount); // 10n
          setAmount(step.amount);
          break;
      }
    }
    return amount;
  };

  const result = useMutation({
    mutationKey: ["useDepositERC20", depositParams.daoAddressOrEns],
    mutationFn: deposit,
    onError(err) {
      console.log({ "❌ useDepositEth()": err });
    },
    ...options,
  });

  return {
    approveTxHash,
    allowance,
    txHash,
    amount,
    depositEth: result.mutate,
    depositEthAsync: result.mutateAsync,
    ...result,
  };
}
