/* eslint-disable @typescript-eslint/no-floating-promises */

import { DaoDepositSteps } from "@aragon/sdk-client";
import { DepositEthParams } from "@aragon/sdk-client/dist/interfaces";
import { useState } from "react";
import { useMutation } from "react-query";

import { useAragonSDKContext } from "../context";

export function useDepositEth(depositParams: DepositEthParams, options?: any): any {
  const { baseClient: client } = useAragonSDKContext();
  const [txHash, setTxHash] = useState(null);
  const [amount, setAmount] = useState<BigInt | null>(null);

  const deposit = async (): Promise<BigInt | null> => {
    const steps = client.methods.deposit(depositParams);

    for await (const step of steps) {
      switch (step.key) {
        case DaoDepositSteps.DEPOSITING:
          setTxHash(step.txHash);
          break;
        case DaoDepositSteps.DONE:
          setAmount(step.amount);
      }
    }
    return amount;
  };

  const result = useMutation({
    mutationKey: ["depositEth", depositParams.daoAddressOrEns],
    mutationFn: deposit,
    onError(err) {
      console.log({ "❌ useDepositEth()": err });
    },
    ...options,
  });

  return {
    depositEth: result.mutate,
    depositEthAsync: result.mutateAsync,
    txHash,
    amount,
    ...result,
  };
}
