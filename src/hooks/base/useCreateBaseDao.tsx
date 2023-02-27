/* eslint-disable @typescript-eslint/no-floating-promises */

import { CreateDaoParams, DaoCreationSteps, DaoMetadata } from "@aragon/sdk-client";

import { useState } from "react";
import { useMutation } from "react-query";
import { Address } from "wagmi";

import { useAragonSDKContext } from "../context";

export function useCreateBaseDao(createParams: CreateDaoParams, metadata: DaoMetadata, options?: any): any {
  const { baseClient: client } = useAragonSDKContext();
  const [txHash, setTxHash] = useState(null);
  const [ipfsUri, setIpfsUri] = useState<string | null>(null);
  const [address, setAddress] = useState<Address | null>(null);

  const create = async (): Promise<Address | null> => {
    setIpfsUri(await client.methods.pinMetadata(metadata));
    const steps = client.methods.createDao({ metadata: ipfsUri, ...createParams });
    for await (const step of steps) {
      switch (step.key) {
        case DaoCreationSteps.CREATING:
          setTxHash(step.txHash);
          break;
        case DaoCreationSteps.DONE:
          setAddress(step.address);
      }
    }
    return address;
  };

  const {
    mutate: createDao,
    mutateAsync: createDaoAsync,
    ...res
  } = useMutation({
    mutationKey: ["CreateDao", createParams.ensSubdomain],
    mutationFn: create,
    onError(err) {
      console.log({ "❌ useCreateBaseDao()": err });
    },
    ...options,
  });

  return {
    createDao,
    createDaoAsync,
    txHash,
    ipfsUri,
    address,
    ...res,
  };
}
