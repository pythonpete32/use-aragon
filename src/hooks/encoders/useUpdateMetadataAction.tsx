import { DaoDetails, DaoMetadata } from "@aragon/sdk-client";
import { useState } from "react";
import { useQuery } from "react-query";
import { useAragonSDKContext } from "../..";
import { Address } from "../../types";

export function useUpdateMetadataAction(metadataParams: DaoMetadata, daoAddressOrEns: Address, options?: any): any {
  const { baseClient: client } = useAragonSDKContext();
  const [ipfsUri, setIpfsUri] = useState<string | null>(null);
  const result = useQuery<DaoDetails | null>({
    queryKey: ["updateMetadata", metadataParams.name, metadataParams.description],
    queryFn: async () => {
      setIpfsUri(await client.methods.pinMetadata(metadataParams));
    },
    enabled: !!client && !!metadataParams && !!daoAddressOrEns,
    onError(err) {
      console.log({ "❌ useUpdateMetadataAction()": err });
    },
    ...options,
  });
  return {
    updateMetadataAction: result.data ?? null,
    ipfsUri,
    ...result,
  };
}
