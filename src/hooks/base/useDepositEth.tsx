/* eslint-disable @typescript-eslint/no-floating-promises */
import { Client } from "@aragon/sdk-client";
import { DaoDepositStepValue, DepositEthParams } from "@aragon/sdk-client/dist/interfaces";
import { useMutation } from "react-query";

import { DepositEthOptions, DepositEthResult } from "../../types";
import { useAragonSDKContext } from "../context";

const deposit = async (client: Client, depositParams: DepositEthParams): Promise<DaoDepositStepValue> => {
  const generator = client.methods.deposit(depositParams);
  const firstStep = await generator.next();
  return firstStep.value;
};

export function useDepositEth(depositParams: DepositEthParams, options?: DepositEthOptions): DepositEthResult {
  const { baseClient: client } = useAragonSDKContext();

  const result = useMutation({
    mutationKey: ["depositEth", depositParams.daoAddressOrEns],
    mutationFn: async () => await deposit(client, depositParams),
    onError(err) {
      console.log({ "❌ useDepositEth()": err });
    },
    ...options,
  });

  const depositEth = result.mutate;
  return { ...result, depositEth };
}
