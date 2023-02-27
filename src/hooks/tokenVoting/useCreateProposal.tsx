/* eslint-disable @typescript-eslint/no-floating-promises */

import { CreateMajorityVotingProposalParams, DaoCreationSteps, DaoMetadata } from "@aragon/sdk-client";

import { useState } from "react";
import { useMutation } from "react-query";
import { Address } from "wagmi";

import { useAragonSDKContext } from "../context";

export function useCreateProposal(
  proposalParams: CreateMajorityVotingProposalParams,
  metadata: DaoMetadata,
  options?: any,
): any {
  const { baseClient: client } = useAragonSDKContext();
  const [txHash, setTxHash] = useState(null);
  const [ipfsUri, setIpfsUri] = useState<string | null>(null);
  const [proposalId, setProposalId] = useState<Address | null>(null);

  const create = async (): Promise<Address | null> => {
    setIpfsUri(await client.methods.pinMetadata(metadata));
    const steps = client.methods.CreateMajorityVotingProposalParams(proposalParams);
    for await (const step of steps) {
      switch (step.key) {
        case DaoCreationSteps.CREATING:
          setTxHash(step.txHash);
          break;
        case DaoCreationSteps.DONE:
          setProposalId(step.proposalId);
      }
    }
    return proposalId;
  };

  const {
    mutate: createDao,
    mutateAsync: createDaoAsync,
    ...result
  } = useMutation({
    mutationKey: ["CreateProposal", proposalParams],
    mutationFn: create,
    onError(err) {
      console.log({ "❌ useCreateProposal()": err });
    },
    ...options,
  });

  return {
    createDao,
    createDaoAsync,
    txHash,
    ipfsUri,
    proposalId,
    ...result,
  };
}
